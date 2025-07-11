<?php

namespace App\Http\Controllers;

use App\Models\AbsenceRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Employee;


class AbsenceRequestController extends Controller
{
    // List absence requests
    public function index()
    {
        $user = Auth::user();

        dd(get_class($user), $user); // Debugging line to check user type

        if ($user->isEmployee()) {
            // Employees can only view their own requests
            $absenceRequests = AbsenceRequest::with('employee')
                ->where('employee_id', $user->employee->id)
                ->paginate(15);
        } else {
            // Admins can view all requests
            $absenceRequests = AbsenceRequest::with('employee')->paginate(15);
        }

        return response()->json($absenceRequests);
    }

    // Show a single absence request
    public function show($id)
    {
        $user = Auth::user();
        $absenceRequest = AbsenceRequest::with('employee')->findOrFail($id);

        // Employees can only view their own
        if ($user->isEmployee() && $absenceRequest->employee_id !== $user->employee->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        return response()->json($absenceRequest);
    }

    // Create a new absence request
    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user->isEmployee()) {
            return response()->json(['error' => 'Only employees can create absence requests'], 403);
        }

        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',

            'absence_type' => 'required|in:annual_leave,sick,permission,other',
            'reason' => 'nullable|string',
            'location_name' => 'nullable|string',
            'address' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'supporting_document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048', // validate file
        ]);

        $validated['employee_id'] = $user->employee->id;

        if ($request->hasFile('supporting_document')) {
            $path = $request->file('supporting_document')->store('absence_documents', 'public');
            $validated['file_path'] = $path;
        }

        $absenceRequest = AbsenceRequest::create($validated);

        return response()->json([
            'message' => 'Absence request created successfully',
            'data' => $absenceRequest,
        ], 201);
    }

    // Update an absence request
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $absenceRequest = AbsenceRequest::findOrFail($id);

        // Only the owner or admin can update
        if ($user->isEmployee() && $absenceRequest->employee_id !== $user->employee->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        // Employees cannot update status
        if ($user->isEmployee() && $request->has('status')) {
            return response()->json(['error' => 'You cannot update status'], 403);
        }

        $validated = $request->validate([
            'absence_type' => 'sometimes|in:annual_leave,sick,permission,other',
            'status' => 'sometimes|in:pending,approved,rejected',
            'reason' => 'nullable|string',
            'file_path' => 'nullable|string',
            'location_name' => 'nullable|string',
            'address' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $absenceRequest->update($validated);

        return response()->json([
            'message' => 'Absence request updated successfully',
            'data' => $absenceRequest,
        ]);
    }

    // Delete an absence request
    public function destroy($id)
    {
        $user = Auth::user();
        $absenceRequest = AbsenceRequest::findOrFail($id);

        // Only the owner or admin can delete
        if ($user->isEmployee() && $absenceRequest->employee_id !== $user->employee->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $absenceRequest->delete();

        return response()->json([
            'message' => 'Absence request deleted successfully',
        ]);
    }
}
