<?php

namespace App\Http\Controllers;

use App\Models\CheckClock;
use App\Models\CheckClockSetting;
use App\Models\CheckClockSettingTime;
use App\Models\Employee;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Carbon\Carbon;

class CheckClockController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'check_clock_type' => 'required|in:0,1', // 0: In, 1: Out
            'check_clock_time' => 'required|date_format:H:i:s',
        ]);

        $employee = Employee::where('user_id', $data['user_id'])->firstOrFail();
        $setting = CheckClockSetting::findOrFail($employee->ck_settings_id);
        $settingTime = CheckClockSettingTime::where('ck_settings_id', $setting->id)
            ->where('day', Carbon::today()->toDateString())
            ->first();

        if (!$settingTime) {
            return response()->json(['message' => 'No schedule found for today'], 400);
        }

        $checkTime = Carbon::today()->setTimeFromTimeString($data['check_clock_time']);
        $status = $this->determineStatus($checkTime, $settingTime, $data['check_clock_type']);

        $checkClock = CheckClock::create([
            'id' => Uuid::uuid4()->toString(),
            'user_id' => $data['user_id'],
            'check_clock_type' => $data['check_clock_type'],
            'check_clock_time' => $data['check_clock_time'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Check clock recorded',
            'check_clock' => $checkClock,
            'status' => $status,
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
            ->with('user.employee');

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
