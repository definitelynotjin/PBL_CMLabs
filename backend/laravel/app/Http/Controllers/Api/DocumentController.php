<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;


class DocumentController extends Controller
{
    public function index($userId)
    {
        return Document::where('user_id', $userId)->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'document_type' => $doc->document_type,
                'file_name' => $doc->file_name,
                'file_url' => Storage::url($doc->file_path),
            ];
        });
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
            'document_type' => 'required|string',
            'file' => 'required|file|max:2048',
        ]);

        $file = $request->file('file');
        $filePath = $file->store('documents', 'public');

        $document = Document::create([
            'user_id' => $request->user_id,
            'document_type' => $request->document_type,
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $filePath,
        ]);

        return response()->json($document, 201);
    }
}
