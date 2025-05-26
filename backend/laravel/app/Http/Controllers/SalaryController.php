<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class SalaryController extends Controller
{
    public function index(Request $request)
    {
        $salaries = Salary::with('user.employee')
            ->when($request->user_id, fn($query, $id) => $query->where('user_id', $id))
            ->paginate(10);

        return response()->json($salaries);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type' => 'required|in:0,1,2', // 0: Hourly, 1: Monthly, 2: Contract
            'rate' => 'required|numeric|min:0',
            'effective_date' => 'required|date', // Note: 'effective_date' typo in schema
        ]);

        $salary = Salary::create(array_merge($data, [
            'id' => Uuid::uuid4()->toString(),
            'created_at' => now(),
            'updated_at' => now(),
        ]));

        return response()->json([
            'message' => 'Salary created successfully',
            'salary' => $salary->load('user.employee'),
        ], 201);
    }

    public function show(Salary $salary)
    {
        return response()->json($salary->load('user.employee'));
    }

    public function update(Request $request, Salary $salary)
    {
        $data = $request->validate([
            'type' => 'sometimes|required|in:0,1,2',
            'rate' => 'sometimes|required|numeric|min:0',
            'efective_date' => 'sometimes|required|date',
        ]);

        $salary->update(array_merge($data, ['updated_at' => now()]));

        return response()->json([
            'message' => 'Salary updated successfully',
            'salary' => $salary,
        ]);
    }

    public function destroy(Salary $salary)
    {
        $salary->delete();
        return response()->json(['message' => 'Salary deleted successfully']);
    }
}
