<?php

namespace App\Http\Controllers;

use App\Models\CheckClock;
use Illuminate\Http\Request;

class CheckClockController extends Controller
{
    public function index()
    {
        return CheckClock::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "user_id" => "required|exists:users,id",
                    "check_clock_type" => "required|integer",
                    "check_clock_time" => "required|date_format:H:i:s",
        ]);

        $item = CheckClock::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            ...$validated,
        ]);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return CheckClock::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = CheckClock::findOrFail($id);
        $validated = $request->validate([
            "user_id" => "sometimes|exists:users,id",
                    "check_clock_type" => "sometimes|integer",
                    "check_clock_time" => "sometimes|date_format:H:i:s",
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = CheckClock::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}