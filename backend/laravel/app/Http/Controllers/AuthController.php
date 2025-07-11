<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\Password;
use App\Http\Controllers\Controller;
use App\Helpers\EmployeeIdGenerator;


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
            'role' => $request->role ?? 'admin',
        ]);

        $user->employee_id = EmployeeIdGenerator::generate();
        $user->save();


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
            'login' => 'required', // email or phone
            'password' => 'required',
        ]);

        $login = $request->input('login');
        $password = $request->input('password');

        $user = User::with('employee')->where('email', $login)
            ->orWhere('phone', $login)
            ->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Check if user has employee record and if status is inactive (0)
        if ($user->employee && $user->employee->status == 0) {
            return response()->json(['message' => 'Your account is inactive. Please contact admin.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }


    public function loginEmployee(Request $request)
    {
        $request->validate([
            'login' => 'required|string', // email or employee_id
            'password' => 'required|string',
        ]);

        $login = $request->input('login');
        $password = $request->input('password');

        $user = User::with('employee')
            ->where('role', 'employee')
            ->where(function ($query) use ($login) {
                $query->where('email', $login)
                    ->orWhere('employee_id', $login);
            })
            ->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json(['message' => 'Invalid employee credentials'], 401);
        }

        if ($user->employee && $user->employee->status == 0) {
            return response()->json(['message' => 'Your account is inactive. Please contact admin.'], 403);
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
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

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

        $status = Password::sendResetLink($request->only('email'));

        if ($status == Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)], 200);
        }

        return response()->json(['message' => __($status)], 400);
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
                $user->forceFill(['password' => Hash::make($password)])->save();
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

        $path = $request->file('avatar')->store('avatars', 'public');

        $user->avatar = $path;
        $user->save();

        return response()->json([
            'avatar' => $user->avatar,
            'message' => 'Avatar uploaded successfully',
        ]);
    }
}
