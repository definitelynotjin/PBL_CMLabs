<?php

namespace App\Http\Controllers;

use App\Models\LetterFormat;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class LetterFormatController extends Controller
{
    public function index(Request $request)
    {
        $letterFormats = LetterFormat::query()
            ->when($request->search, fn($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->paginate(10);

        return response()->json($letterFormats);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'content' => 'required|string',
            'status' => 'required|in:0,1,2', // 0: Draft, 1: Active, 2: Archived
        ]);

        $letterFormat = LetterFormat::create(array_merge($data, [
            'id' => Uuid::uuid4()->toString(),
            'created_at' => now(),
            'updated_at' => now(),
        ]));

        return response()->json([
            'message' => 'Letter format created successfully',
            'letter_format' => $letterFormat,
        ], 201);
    }

    public function show(LetterFormat $letterFormat)
    {
        return response()->json($letterFormat);
    }

    public function update(Request $request, LetterFormat $letterFormat)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'content' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:0,1,2',
        ]);

        $letterFormat->update(array_merge($data, ['updated_at' => now()]));

        return response()->json([
            'message' => 'Letter format updated successfully',
            'letter_format' => $letterFormat,
        ]);
    }

    public function destroy(LetterFormat $letterFormat)
    {
        $letterFormat->delete();
        return response()->json(['message' => 'Letter format deleted successfully']);
    }
}
