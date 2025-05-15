<?php

namespace Database\Seeders;

use App\Models\LetterFormat;
use Illuminate\Database\Seeder;

class LetterFormatSeeder extends Seeder
{
    public function run(): void
    {
    LetterFormat::factory()->create([
            "id" => "9e0f1g2h-3c3d-44e5-a6f7-789012345601",
                "name" => "Promotion Letter",
                "content" => "Dear [Name], We are pleased to promote you...",
                "status" => 1,
        ]);
    LetterFormat::factory()->create([
            "id" => "9e0f1g2h-3c3d-44e5-a6f7-789012345602",
                "name" => "Resignation Letter",
                "content" => "Dear [Name], I hereby resign from my position...",
                "status" => 1,
        ]);

    }
}