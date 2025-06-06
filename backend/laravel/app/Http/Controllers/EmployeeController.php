<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;




class EmployeeController extends Controller
{

    public function index(Request $request)
    {
        $search = $request->search;
        $employees = Employee::with(['user', 'checkClockSetting'])
            ->when($search, function ($query, $search) {
                $query->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            })
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $employees
        ]);
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
            'email' => 'required|email|unique:employees,email',
            'phone' => 'required|string|unique:employees,phone',
            'position' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'join_date' => 'nullable|date',
            'employment_status' => 'nullable|string|max:50',
        ]);

        $employee = Employee::create(array_merge($data, ['id' => Uuid::uuid4()->toString()]));

        return response()->json([
            'success' => true,
            'message' => 'Employee created successfully',
            'data' => $employee,
        ], 201);
    }

    public function show(Employee $employee)
    {
        return response()->json([
            'success' => true,
            'data' => $employee->load(['user', 'checkClockSetting'])
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'first_name' => 'sometimes|required|string|max:100',
            'last_name' => 'sometimes|required|string|max:100',
            'gender' => 'sometimes|required|in:M,F',
            'address' => 'sometimes|required|string',
            'ck_settings_id' => 'sometimes|required|exists:check_clock_settings,id',
            'email' => 'sometimes|required|email|unique:employees,email,' . $employee->id,
            'phone' => 'sometimes|required|string|unique:employees,phone,' . $employee->id,
            'position' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'join_date' => 'nullable|date',
            'employment_status' => 'nullable|string|max:50',
        ]);

        $employee->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Employee updated successfully',
            'data' => $employee,
        ]);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json([
            'success' => true,
            'message' => 'Employee deleted successfully'
        ]);
    }

    public function candidates()
    {
        // Get all existing employee IDs from employees table
        $existingEmployeeIds = Employee::pluck('id')->toArray();

        // Get users with role 'employee' whose employee_id is NOT in existing employee IDs
        $candidates = User::where('role', 'employee')
            ->whereNotIn('employee_id', $existingEmployeeIds)
            ->select('id', 'name', 'email', 'employee_id')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $candidates
        ]);
    }
}
