<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "user_id" => "required|exists:users,id",
                    "ck_settings_id" => "required|exists:check_clock_settings,id",
                    "first_name" => "required|string|max:100",
                    "last_name" => "required|string|max:100",
                    "gender" => "required|in:M,F",
                    "address" => "nullable|string",
        ]);

        $item = Employee::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            ...$validated,
        ]);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return Employee::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Employee::findOrFail($id);
        $validated = $request->validate([
            "user_id" => "sometimes|exists:users,id",
                    "ck_settings_id" => "sometimes|exists:check_clock_settings,id",
                    "first_name" => "sometimes|string|max:100",
                    "last_name" => "sometimes|string|max:100",
                    "gender" => "sometimes|in:M,F",
                    "address" => "nullable|string",
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Employee::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}