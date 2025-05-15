<?php

namespace App\Http\Controllers;

use App\Models\CheckClockSetting;
use Illuminate\Http\Request;

class CheckClockSettingController extends Controller
{
    public function index()
    {
        return CheckClockSetting::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string|max:50",
                    "type" => "required|integer",
        ]);

        $item = CheckClockSetting::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            ...$validated,
        ]);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return CheckClockSetting::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = CheckClockSetting::findOrFail($id);
        $validated = $request->validate([
            "name" => "sometimes|string|max:50",
                    "type" => "sometimes|integer",
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = CheckClockSetting::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}