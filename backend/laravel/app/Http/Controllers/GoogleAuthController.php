<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GoogleAuthController
{
    public function googleLogin(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $token = $request->input('token');

        $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken($token);

        if (!$payload) {
            return response()->json(['message' => 'Invalid Google token'], 401);
        }

        $email = $payload['email'];
        $name = $payload['name'] ?? 'No Name';

        // Find or create user by email
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make(uniqid()),
                'role' => 'employee' // Default role for Google login
            ]
        );

        // Create personal access token
        $authToken = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $authToken,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'employee_id' => $user->employee_id,
            ],
            'message' => 'Google login successful',
        ]);
    }

    public function googleCallback(Request $request)
    {
        $request->validate([
            'credential' => 'required|string',
        ]);

        $credential = $request->input('credential');

        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));


        $payload = $client->verifyIdToken($credential);

        if (!$payload) {
            return response()->json(['message' => 'Invalid Google token'], 401);
        }

        \Log::info('Google token payload', ['payload' => $payload]);

        $email = $payload['email'];
        $name = $payload['name'] ?? $email;

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'id' => Str::uuid()->toString(),
                'name' => $name,
                'password' => bcrypt(Str::random(32)),
                'role' => 'employee',
                'is_active' => true,
            ]
        );

        if (!$user->is_active) {
            return response()->json(['message' => 'User account inactive'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'employee_id' => $user->employee_id,
            ],
            'message' => 'Google login successful',
        ]);
    }
}
