<?php

namespace App\Http\Controllers;

use App\Models\CheckClockSettingTime;
use Illuminate\Http\Request;

class CheckClockSettingTimeController extends Controller
{
    public function index()
    {
        return CheckClockSettingTime::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "ck_settings_id" => "required|exists:check_clock_settings,id",
                    "day" => "required|date",
                    "clock_in" => "required|date_format:H:i:s",
                    "clock_out" => "required|date_format:H:i:s",
                    "break_start" => "required|date_format:H:i:s",
                    "break_end" => "required|date_format:H:i:s",
        ]);

        $item = CheckClockSettingTime::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            ...$validated,
        ]);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return CheckClockSettingTime::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = CheckClockSettingTime::findOrFail($id);
        $validated = $request->validate([
            "ck_settings_id" => "sometimes|exists:check_clock_settings,id",
                    "day" => "sometimes|date",
                    "clock_in" => "sometimes|date_format:H:i:s",
                    "clock_out" => "sometimes|date_format:H:i:s",
                    "break_start" => "sometimes|date_format:H:i:s",
                    "break_end" => "sometimes|date_format:H:i:s",
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = CheckClockSettingTime::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}