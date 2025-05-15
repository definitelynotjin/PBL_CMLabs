<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "email" => "required|email|unique:users",
                    "password" => "required|string|min:8",
                    "is_admin" => "required|boolean",
        ]);

        $item = User::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            ...$validated,
        ]);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = User::findOrFail($id);
        $validated = $request->validate([
            "email" => "sometimes|email|unique:users,email," . $id,
                    "password" => "sometimes|string|min:8",
                    "is_admin" => "sometimes|boolean",
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = User::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}