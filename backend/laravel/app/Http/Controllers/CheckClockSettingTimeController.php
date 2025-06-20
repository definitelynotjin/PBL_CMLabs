<?php

namespace App\Http\Controllers;

use App\Models\CheckClockSettingTime;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class CheckClockSettingTimeController extends Controller
{
    public function index()
    {
        return response()->json(CheckClockSettingTime::with('setting')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'ck_settings_id' => 'required|exists:check_clock_settings,id',
            'day' => 'required|string|max:20', // e.g., "Monday"
            'clock_in' => 'required|date_format:H:i:s',
            'clock_out' => 'required|date_format:H:i:s',
            'break_start' => 'nullable|date_format:H:i:s',
            'break_end' => 'nullable|date_format:H:i:s',
        ]);

        $data['id'] = Str::uuid();

        $timeSetting = CheckClockSettingTime::create($data);

        return response()->json($timeSetting, 201);
    }

    public function show($id)
    {
        return response()->json(CheckClockSettingTime::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $timeSetting = CheckClockSettingTime::findOrFail($id);

        $data = $request->validate([
            'day' => 'sometimes|string|max:20',
            'clock_in' => 'sometimes|date_format:H:i:s',
            'clock_out' => 'sometimes|date_format:H:i:s',
            'break_start' => 'nullable|date_format:H:i:s',
            'break_end' => 'nullable|date_format:H:i:s',
        ]);

        $timeSetting->update($data);

        return response()->json($timeSetting);
    }

    public function destroy($id)
    {
        $timeSetting = CheckClockSettingTime::findOrFail($id);
        $timeSetting->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
