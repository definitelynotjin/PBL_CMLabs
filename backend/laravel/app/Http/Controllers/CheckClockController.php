<?php

namespace App\Http\Controllers;

use App\Models\CheckClock;
use App\Models\CheckClockSetting;
use App\Models\CheckClockSettingTime;
use App\Models\Employee;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class CheckClockController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'check_clock_type' => 'required|in:1,2',
            'check_clock_time' => 'required|date_format:H:i:s',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $user = Auth::user();

        $checkClock = CheckClock::create([
            'id' => Str::uuid(),
            'user_id' => $user->id,
            'check_clock_type' => $validated['check_clock_type'],
            'check_clock_time' => $validated['check_clock_time'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
        ]);

        return response()->json($checkClock, 201);
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
        if ($checkType == 0) { // Check-in
            $scheduledIn = Carbon::createFromTimeString($settingTime->clock_in);
            $gracePeriod = $scheduledIn->copy()->addMinutes(15);
            return $checkTime->gt($gracePeriod) ? 'late' : 'on_time';
        } else { // Check-out
            $scheduledOut = Carbon::createFromTimeString($settingTime->clock_out);
            return $checkTime->lt($scheduledOut) ? 'early' : 'on_time';
        }
    }
}
