<?php

namespace App\Http\Controllers;

use App\Models\CheckClockSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;




class CheckClockSettingController extends Controller
{
    public function index()
    {
        return response()->json(CheckClockSetting::with('times')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'sometimes|in:0,1,2', // 0: WFO, 1: WFA, 2: Hybrid
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'radius' => 'nullable|integer',
        ]);

        $data['id'] = Str::uuid();

        $setting = CheckClockSetting::create($data);

        return response()->json($setting, 201);
    }

    public function show($id)
    {
        return response()->json(CheckClockSetting::with('times')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $setting = CheckClockSetting::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:1,2',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'radius' => 'nullable|integer',
        ]);

        $setting->update($data);

        return response()->json($setting);
    }

    public function destroy($id)
    {
        $setting = CheckClockSetting::findOrFail($id);
        $setting->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
