<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Password;


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
        ]);

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
            'role' => $request->role ?? 'employee',
        ]);

        // Only assign employee_id if role is employee
        if ($user->role === 'employee') {
            $user->employee_id = $this->generateUniqueEmployeeId();
            $user->save();
        }

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

    private function generateUniqueEmployeeId()
    {
        // Example: Find last employee_id and increment
        $lastUser = User::whereNotNull('employee_id')
            ->orderBy('employee_id', 'desc')
            ->first();

        if (!$lastUser || !$lastUser->employee_id) {
            return 'EMP001';
        }

        // Extract number from employee_id string like EMP001
        $lastNumber = (int) filter_var($lastUser->employee_id, FILTER_SANITIZE_NUMBER_INT);
        $nextNumber = $lastNumber + 1;

        return 'EMP' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
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

    // Employee login with Employee ID or email
    public function loginEmployee(Request $request)
    {
        $request->validate([
            'login' => 'required|string', // email or employee_id
            'password' => 'required|string',
        ]);

        $login = $request->input('login');
        $password = $request->input('password');

        $user = User::with('employee') // eager load the related employee data
            ->where('role', 'employee')
            ->where(function ($query) use ($login) {
                $query->where('email', $login)
                    ->orWhere('employee_id', $login);
            })
            ->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json(['message' => 'Invalid employee credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
            'employee' => $user->employee,
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
                'avatar' => $user->avatar ? secure_url('storage/' . $user->avatar) : null,
            ]
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

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();

                // Optionally revoke all tokens after password reset
                $user->tokens()->delete();
            }
        );

        return $status == Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 400);
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        $user = $request->user();

        // Store avatar in 'avatars' folder with unique filename
        $path = $request->file('avatar')->store('avatars', 'public');

        // Save avatar path to user model
        $user->avatar = $path;
        $user->save();

        return response()->json([
            'avatar' => $user->avatar,
            'message' => 'Avatar uploaded successfully',
        ]);
    }
}
