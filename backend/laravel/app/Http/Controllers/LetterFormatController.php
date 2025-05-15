<?php

namespace App\Http\Controllers;

use App\Models\LetterFormat;
use Illuminate\Http\Request;

class LetterFormatController extends Controller
{
    public function index()
    {
        return LetterFormat::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string|max:100",
                    "content" => "required|string",
                    "status" => "required|integer",
        ]);

        $item = LetterFormat::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            ...$validated,
        ]);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return LetterFormat::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = LetterFormat::findOrFail($id);
        $validated = $request->validate([
            "name" => "sometimes|string|max:100",
                    "content" => "sometimes|string",
                    "status" => "sometimes|integer",
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = LetterFormat::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}