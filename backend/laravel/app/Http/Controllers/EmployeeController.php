<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Helpers\EmployeeIdGenerator;

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
        $validated = $request->validate([
            'ck_settings_id' => 'required|exists:check_clock_settings,id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'gender' => 'required|in:M,F',
            'address' => 'required|string',
            'email' => 'required|email|unique:users,email',
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

        $uuid = \Ramsey\Uuid\Uuid::uuid4()->toString();

        // Create User with consistent UUID
        $user = User::create([
            'id' => $uuid,
            'name' => $validated['first_name'] . ' ' . $validated['last_name'],
            'email' => $validated['email'],
            'password' => bcrypt('defaultpassword'), // or generate random password
            'role' => 'employee',
            'status' => 'active',
        ]);

        // Generate EMP001-like employee ID
        $user->employee_id = EmployeeIdGenerator::generate();
        $user->save();

        // Create Employee linked to User
        $employee = Employee::create(array_merge(
            $validated,
            [
                'id' => \Ramsey\Uuid\Uuid::uuid4()->toString(),
                'user_id' => $uuid,
            ]
        ));

        return response()->json([
            'success' => true,
            'message' => 'Employee and user created successfully',
            'data' => $employee,
        ], 201);
    }



    public function show($id)
    {
        $employee = Employee::with(['user', 'checkClockSetting'])
            ->where('id', $id)
            ->orWhere('user_id', $id)
            ->first();

        if (!$employee) {
            return response()->json([
                'success' => false,
                'message' => 'Employee not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $employee
        ]);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::where('id', $id)->orWhere('user_id', $id)->firstOrFail();

        $data = $request->validate([
            'first_name' => 'sometimes|required|string|max:100',
            'last_name' => 'sometimes|required|string|max:100',
            'gender' => 'sometimes|required|in:M,F',
            'address' => 'sometimes|required|string',
            'ck_settings_id' => 'sometimes|required|exists:check_clock_settings,id',
            'email' => ['sometimes', 'required', 'email', Rule::unique('employees', 'email')->ignore($employee->id)],
            'phone' => ['sometimes', 'required', 'string', Rule::unique('employees', 'phone')->ignore($employee->id)],
            'position' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'join_date' => 'nullable|date',
            'employment_status' => 'sometimes|nullable|string|max:50',
            'status' => 'sometimes|boolean',
            'nik' => ['sometimes', 'required', 'string', Rule::unique('employees', 'nik')->ignore($employee->id)],
            'pendidikan_terakhir' => 'nullable|string|max:50',
            'tempat_lahir' => 'nullable|string|max:100',
            'contract_type' => 'nullable|in:Tetap,Kontrak,Lepas',
            'grade' => 'nullable|string|max:50',
            'bank' => 'nullable|string|max:50',
            'nomor_rekening' => 'nullable|string|max:30',
            'atas_nama_rekening' => 'nullable|string|max:100',
            'tipe_sp' => 'nullable|in:SP 1,SP 2,SP 3',
        ]);

        $employee->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Employee updated successfully',
            'data' => $employee,
        ]);
    }

    public function destroy($id)
    {
        $employee = Employee::where('id', $id)->orWhere('user_id', $id)->firstOrFail();

        $employee->delete();

        return response()->json([
            'success' => true,
            'message' => 'Employee deleted successfully'
        ]);
    }



    public function upsert(Request $request, $id)
    {
        $employee = Employee::where('id', $id)->orWhere('user_id', $id)->first();

        $rules = [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'gender' => 'required|in:M,F',
            'address' => 'required|string',
            'ck_settings_id' => 'required|exists:check_clock_settings,id',
            'email' => ['required', 'email', Rule::unique('employees', 'email')->ignore($employee?->id)],
            'phone' => ['required', 'string', Rule::unique('employees', 'phone')->ignore($employee?->id)],
            'nik' => ['required', 'string', Rule::unique('employees', 'nik')->ignore($employee?->id)],
            'position' => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'join_date' => 'nullable|date',
            'employment_status' => 'sometimes|nullable|string|max:50',
            'status' => 'sometimes|boolean',
            'pendidikan_terakhir' => 'nullable|string|max:50',
            'tempat_lahir' => 'nullable|string|max:100',
            'contract_type' => 'nullable|in:Tetap,Kontrak,Lepas',
            'grade' => 'nullable|string|max:50',
            'bank' => 'nullable|string|max:50',
            'nomor_rekening' => 'nullable|string|max:30',
            'atas_nama_rekening' => 'nullable|string|max:100',
            'tipe_sp' => 'nullable|in:SP 1,SP 2,SP 3',
            // 'type' => 'nullable|string',  <- REMOVED
        ];

        $data = $request->validate($rules);

        if ($employee) {
            $employee->update($data);
            $message = 'Employee updated successfully';
        } else {
            $data['user_id'] = $id;
            $employee = Employee::create(array_merge($data, ['id' => Uuid::uuid4()->toString()]));
            $message = 'Employee created successfully';
        }

        // If user exists, update status to active
        $user = User::find($id);
        if ($user) {
            $user->status = 'active';
            $user->save();
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $employee,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|boolean']);

        $employee = Employee::findOrFail($id);
        $employee->status = $request->status;
        $employee->save();

        return response()->json(['success' => true, 'status' => $employee->status]);
    }
}
