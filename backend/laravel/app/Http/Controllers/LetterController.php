<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use Illuminate\Http\Request;

class LetterController extends Controller
{
    public function index()
    {
        return Letter::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "letter_format_id" => "required|exists:letter_formats,id",
                    "user_id" => "required|exists:users,id",
                    "name" => "required|string|max:100",
        ]);

        $item = Letter::create([
            'id' => (string) \Illuminate\Support\Str::uuid(),
            ...$validated,
        ]);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        return Letter::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Letter::findOrFail($id);
        $validated = $request->validate([
            "letter_format_id" => "sometimes|exists:letter_formats,id",
                    "user_id" => "sometimes|exists:users,id",
                    "name" => "sometimes|string|max:100",
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Letter::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}