<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $employees = Employee::with(['user', 'checkClockSetting'])
            ->when($request->search, fn($query, $search) => $query->where('first_name', 'like', "%{$search}%")
                ->orWhere('last_name', 'like', "%{$search}%"))
            ->paginate(10);

        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'ck_settings_id' => 'required|exists:check_clock_settings,id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'gender' => 'required|in:M,F',
            'address' => 'required|string',
        ]);

        $employee = Employee::create(array_merge($data, ['id' => Uuid::uuid4()->toString()]));

        return response()->json([
            'message' => 'Employee created successfully',
            'employee' => $employee,
        ], 201);
    }

    public function show(Employee $employee)
    {
        return response()->json($employee->load(['user', 'checkClockSetting']));
    }

    public function update(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'first_name' => 'sometimes|required|string|max:100',
            'last_name' => 'sometimes|required|string|max:100',
            'gender' => 'sometimes|required|in:M,F',
            'address' => 'sometimes|required|string',
            'ck_settings_id' => 'sometimes|required|exists:check_clock_settings,id',
        ]);

        $employee->update($data);

        return response()->json([
            'message' => 'Employee updated successfully',
            'employee' => $employee,
        ]);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
