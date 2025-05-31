<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Google_Client;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|unique:users,phone',
            'role' => 'nullable|in:admin,employee',
            'employee_id' => 'nullable|string|unique:users,employee_id',
        ]);

        // Custom validation: must have either email or phone
        if (empty($request->email) && empty($request->phone)) {
            return response()->json([
                'message' => 'Either email or phone number is required'
            ], 422);
        }

        $user = User::create([
            'id' => Uuid::uuid4()->toString(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => $request->role ?? 'admin',
            'employee_id' => $request->employee_id,
        ]);

        // Create a personal access token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'employee_id' => $user->employee_id,
            ]
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required', // can be email or phone
            'password' => 'required',
        ]);

        $login = $request->input('login');
        $password = $request->input('password');

        // Find user by email or phone
        $user = \App\Models\User::where('email', $login)
            ->orWhere('phone', $login)
            ->first();

        if (!$user || !\Hash::check($password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    // Keep your original email-only login as backup (optional)
    public function loginWithEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Create a personal access token
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
            ]
        ]);
    }

    // New phone login method
    public function loginWithPhone(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Create a personal access token
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
            ]
        ]);
    }

    // Employee login with Employee ID
    public function loginEmployee(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('employee_id', $request->employee_id)
            ->where('role', 'employee')
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid employee credentials'], 401);
        }

        // Create a personal access token
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
            ]
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke all tokens for the authenticated user
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    // Get current authenticated user
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role,
                'employee_id' => $user->employee_id,
            ]
        ]);
    }

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
                'role' => 'admin' // Default role for Google login
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

        $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken($credential);

        if (!$payload) {
            return response()->json(['message' => 'Invalid Google token'], 401);
        }

        $email = $payload['email'];
        $name = $payload['name'] ?? $email;

        // Find or create user by email
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'id' => Str::uuid()->toString(),
                'name' => $name,
                'password' => bcrypt(Str::random(32)),
                'role' => 'admin', // or 'employee' if you want
                'is_active' => true,
            ]
        );

        // Create personal access token
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

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Send the password reset link to the user
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)], 200);
        } else {
            return response()->json(['message' => __($status)], 400);
        }
}
