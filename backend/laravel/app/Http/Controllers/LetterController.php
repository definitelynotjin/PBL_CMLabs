<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use App\Models\LetterFormat;
use App\Models\User;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class LetterController extends Controller
{
    public function index(Request $request)
    {
        $letters = Letter::with(['user.employee', 'letterFormat'])
            ->when($request->user_id, fn($query, $id) => $query->where('user_id', $id))
            ->paginate(10);

        return response()->json($letters);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'letter_format_id' => 'required|exists:letter_formats,id',
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:100',
        ]);

        $letter = Letter::create(array_merge($data, [
            'id' => Uuid::uuid4()->toString(),
            'created_at' => now(),
            'updated_at' => now(),
        ]));

        return response()->json([
            'message' => 'Letter created successfully',
            'letter' => $letter->load(['user.employee', 'letterFormat']),
        ], 201);
    }

    public function show(Letter $letter)
    {
        return response()->json($letter->load(['user.employee', 'letterFormat']));
    }

    public function update(Request $request, Letter $letter)
    {
        $data = $request->validate([
            'letter_format_id' => 'sometimes|required|exists:letter_formats,id',
            'name' => 'sometimes|required|string|max:100',
        ]);

        $letter->update(array_merge($data, ['updated_at' => now()]));

        return response()->json([
            'message' => 'Letter updated successfully',
            'letter' => $letter,
        ]);
    }

    public function destroy(Letter $letter)
    {
        $letter->delete();
        return response()->json(['message' => 'Letter deleted successfully']);
    }
}
