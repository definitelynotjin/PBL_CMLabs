<?php

namespace Database\Seeders;

use App\Models\Letter;
use Illuminate\Database\Seeder;

class LetterSeeder extends Seeder
{
    public function run(): void
    {
    Letter::factory()->create([
            "id" => "af1h2i3j-4d4e-55f6-b7g8-890123456701",
                "letter_format_id" => "9e0f1g2h-3c3d-44e5-a6f7-789012345601",
                "user_id" => "550e8400-e29b-41d4-a716-446655440002",
                "name" => "Promotion Letter for John",
        ]);
    Letter::factory()->create([
            "id" => "af1h2i3j-4d4e-55f6-b7g8-890123456702",
                "letter_format_id" => "9e0f1g2h-3c3d-44e5-a6f7-789012345602",
                "user_id" => "550e8400-e29b-41d4-a716-446655440003",
                "name" => "Resignation Letter for Jane",
        ]);

    }
}