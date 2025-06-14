<?php

namespace App\Http\Controllers;

use App\Models\CheckClock;
use App\Models\CheckClockSettingTime;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;



class CheckClockController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'check_clock_type' => 'required|in:1,2',
            'check_clock_time' => 'required|date_format:H:i:s',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'supporting_document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048', // validate the file
        ]);


        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Get today’s setting time based on weekday
        $today = now()->format('l'); // E.g., "Monday"
        $settingTime = CheckClockSettingTime::whereHas('setting', function ($query) {
            $query->where('type', 1); // Optional: filter by type
        })
            ->where('day', $today)
            ->first();

        if (!$settingTime) {
            return response()->json(['message' => 'Schedule not set for today.'], 400);
        }

        // Determine status (on_time, late, early)
        $checkTime = Carbon::createFromFormat('H:i:s', $validated['check_clock_time']);
        $status = $this->determineStatus($checkTime, $settingTime, $validated['check_clock_type']);

        // Handle file upload
        $filePath = null;
        if ($request->hasFile('supporting_document')) {
            $filePath = $request->file('supporting_document')->store('supporting_documents', 'public');
        }

        // Create clock record with file path
        $checkClock = CheckClock::create([
            'id' => Str::uuid(),
            'user_id' => $user->id,
            'check_clock_type' => $validated['check_clock_type'],
            'check_clock_time' => $validated['check_clock_time'],
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'supporting_document_path' => $filePath,
        ]);

        return response()->json([
            'data' => $checkClock,
            'status' => $status
        ], 201);
    }


    public function report(Request $request)
    {
        $data = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $query = CheckClock::query()
            ->whereBetween('created_at', [$data['start_date'], $data['end_date']])
            ->when($data['user_id'], fn($q, $id) => $q->where('user_id', $id))
            ->with('employee'); // <-- here

        $report = $query->paginate(10);

        return response()->json($report);
    }

    protected function determineStatus($checkTime, $settingTime, $checkType)
    {
        if ($checkType == 1) { // Check-in
            $scheduledIn = Carbon::createFromTimeString($settingTime->clock_in);
            $gracePeriod = $scheduledIn->copy()->addMinutes(15);
            return $checkTime->gt($gracePeriod) ? 'late' : 'on_time';
        } else { // Check-out (2)
            $scheduledOut = Carbon::createFromTimeString($settingTime->clock_out);
            return $checkTime->lt($scheduledOut) ? 'early' : 'on_time';
        }
    }

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
}
