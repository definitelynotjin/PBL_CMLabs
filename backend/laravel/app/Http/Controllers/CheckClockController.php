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
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'check_clock_type' => 'required|in:1,2',
            'check_clock_time' => 'required|date_format:H:i:s',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'supporting_document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Get the employee record related to the user
        $employee = $user->employee;

        if (!$employee || !$employee->ck_settings_id) {
            return response()->json(['message' => 'User does not have a clock setting assigned.'], 400);
        }

        $userSettingId = $employee->ck_settings_id;

        // Get today’s weekday name e.g. "Monday"
        $today = now()->format('l');

        // Find schedule for this user's setting and today's day
        $settingTime = CheckClockSettingTime::where('ck_settings_id', $userSettingId)
            ->where('day', $today)
            ->first();

        if (!$settingTime) {
            return response()->json(['message' => 'Schedule not set for today.'], 400);
        }

        // Optional: Geofence validation
        $setting = $employee->checkClockSetting;
        if ($setting && $validated['latitude'] && $validated['longitude']) {
            $distance = $this->calculateDistance(
                $setting->latitude,
                $setting->longitude,
                $validated['latitude'],
                $validated['longitude']
            );

            if ($distance > $setting->radius) {
                return response()->json(['message' => 'You are outside the allowed clock-in location.'], 400);
            }
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

    // Haversine formula to calculate distance in meters between two lat/lng points
    protected function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371000; // meters

        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        $dLat = $lat2 - $lat1;
        $dLon = $lon2 - $lon1;

        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos($lat1) * cos($lat2) *
            sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }
}
