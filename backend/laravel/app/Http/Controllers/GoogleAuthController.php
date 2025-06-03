<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Google_Client;

class GoogleAuthController extends Controller
{
    protected $googleClient;

    public function __construct()
    {
        $this->googleClient = new Google_Client();
        $this->googleClient->setClientId(env('GOOGLE_CLIENT_ID'));
    }

    public function callback(Request $request)
    {
        $request->validate([
            'credential' => 'required|string',
        ]);

        $token = $request->input('credential');
        $payload = $this->googleClient->verifyIdToken($token);

        if (!$payload) {
            return response()->json(['message' => 'Invalid Google token'], 401);
        }

        $email = $payload['email'];
        $name = $payload['name'] ?? $email;
        $googleId = $payload['sub']; // Google's unique user id

        // Try to find user by google_id or email
        $user = User::where('google_id', $googleId)->orWhere('email', $email)->first();

        if (!$user) {
            $user = User::create([
                'id' => Str::uuid()->toString(),
                'name' => $name,
                'email' => $email,
                'google_id' => $googleId,
                'password' => Hash::make(Str::random(32)), // random password
                'role' => 'employee',
                'is_active' => true,
            ]);
        } else {
            // Update google_id if missing
            if (!$user->google_id) {
                $user->google_id = $googleId;
                $user->save();
            }
        }

        if (!$user->is_active) {
            return response()->json(['message' => 'User account inactive'], 403);
        }

        $authToken = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $authToken,
            'user' => $user->only(['id', 'name', 'email', 'phone', 'role', 'employee_id']),
            'message' => 'Google login successful',
        ]);
    }
}
