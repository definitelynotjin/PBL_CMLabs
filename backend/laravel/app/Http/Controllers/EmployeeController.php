<?php

namespace App\Http\Controllers;

use App\Models\CheckClock;
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

        $employees->getCollection()->transform(function ($employee) {
            $employee->employee_user_id = $employee->user ? $employee->user->employee_id : null;
            return $employee;
        });

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
            'nik' => 'required|string|unique:employees,nik',
            'pendidikan_terakhir' => 'nullable|string|max:50',
            'tempat_lahir' => 'nullable|string|max:100',
            'contract_type' => 'nullable|in:Tetap,Kontrak,Lepas',
            'grade' => 'nullable|string|max:50',
            'bank' => 'nullable|string|max:50',
            'nomor_rekening' => 'nullable|string|max:30',
            'atas_nama_rekening' => 'nullable|string|max:100',
            'tipe_sp' => 'nullable|in:SP 1,SP 2,SP 3',
        ]);

        $employee = Employee::create(array_merge($data, ['id' => Uuid::uuid4()->toString()]));

        return response()->json([
            'success' => true,
            'message' => 'Employee created successfully',
            'data' => $employee,
        ], 201);
    }

    public function show($id)
    {
        // Try find Employee by primary key (id)
        $employee = Employee::with(['user', 'checkClockSetting'])->find($id);

        if (!$employee) {
            // If not found, maybe $id is a user ID, try find Employee by user_id
            $employee = Employee::with(['user', 'checkClockSetting'])->where('user_id', $id)->first();
        }

        if (!$employee) {
            // Employee doesn't exist, so return something indicating creation mode
            // Also, you might want to fetch user info to prefill creation form
            $user = User::find($id);
            if (!$user) {
                return response()->json(['success' => false, 'message' => 'User or Employee not found'], 404);
            }
            return response()->json([
                'success' => true,
                'data' => null,
                'candidate' => $user
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $employee
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
            'nik' => 'sometimes|required|string|unique:employees,nik,' . $employee->id,
            'pendidikan_terakhir' => 'nullable|string|max:50',
            'tempat_lahir' => 'nullable|string|max:100',
            'contract_type' => 'nullable|in:Tetap,Kontrak,Lepas',
            'grade' => 'nullable|string|max:50',
            'bank' => 'nullable|string|max:50',
            'nomor_rekening' => 'nullable|string|max:30',
            'atas_nama_rekening' => 'nullable|string|max:100',
            'tipe_sp' => 'nullable|in:SP 1,SP 2,SP 3',
            'status' => 'sometimes|boolean',
            'employment_status' => 'sometimes|in:candidate,employee ',
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
        // Get all user-linked employee_ids from the employees table
        $existingEmployeeIds = Employee::pluck('user_id')->toArray();

        // Get users with role 'employee' who do NOT yet exist in the employees table
        $candidates = User::whereNotIn('id', $existingEmployeeIds)
            ->select('id', 'name', 'email', 'employee_id')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $candidates
        ]);
    }

    public function checkClocks()
    {
        return $this->hasMany(CheckClock::class, 'user_id', 'user_id');
    }

    public function upsert(Request $request, $id)
    {
        // Check if employee exists by id or user_id
        $employee = Employee::where('id', $id)->orWhere('user_id', $id)->first();

        $rules = [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'gender' => 'required|in:M,F',
            'address' => 'required|string',
            'ck_settings_id' => 'required|exists:check_clock_settings,id',
            'email' => 'required|email|unique:employees,email,' . ($employee?->id ?? 'NULL'),
            'phone' => 'required|string|unique:employees,phone,' . ($employee?->id ?? 'NULL'),
            'position' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'join_date' => 'nullable|date',
            'employment_status' => 'nullable|string|max:50',
            'nik' => 'required|string|unique:employees,nik,' . ($employee?->id ?? 'NULL'),
            'pendidikan_terakhir' => 'nullable|string|max:50',
            'tempat_lahir' => 'nullable|string|max:100',
            'contract_type' => 'nullable|in:Tetap,Kontrak,Lepas',
            'grade' => 'nullable|string|max:50',
            'bank' => 'nullable|string|max:50',
            'nomor_rekening' => 'nullable|string|max:30',
            'atas_nama_rekening' => 'nullable|string|max:100',
            'tipe_sp' => 'nullable|in:SP 1,SP 2,SP 3',
        ];

        $data = $request->validate($rules);

        if ($employee) {
            // Update existing employee
            $employee->update($data);
            $message = 'Employee updated successfully';
        } else {
            // Create new employee linked to user_id = $id (candidate)
            $data['user_id'] = $id;
            $employee = Employee::create(array_merge($data, ['id' => Uuid::uuid4()->toString()]));
            $message = 'Employee created successfully';
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $employee,
        ]);
    }
}
