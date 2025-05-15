<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    public function index()
    {
        return Salary::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "user_id" => "required|exists:users,id",
                    "type" => "required|integer",
                    "rate" => "required|numeric",
                    "effective_date" => "required|date",
        ]);

        $item = Salary::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            ...$validated,
        ]);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return Salary::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Salary::findOrFail($id);
        $validated = $request->validate([
            "user_id" => "sometimes|exists:users,id",
                    "type" => "sometimes|integer",
                    "rate" => "sometimes|numeric",
                    "effective_date" => "sometimes|date",
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Salary::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}