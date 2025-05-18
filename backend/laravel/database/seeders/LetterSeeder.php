<?php

namespace Database\Seeders;

use App\Models\Letter;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LetterSeeder extends Seeder
{
    public function run(): void
    {
        // Find users by email (must match seeded users)
        $user1 = User::where('email', 'employee1@example.com')->first();
        $user2 = User::where('email', 'employee2@example.com')->first();

        // Replace these with real letter format IDs or fetch dynamically
        $letterFormatId1 = '9e0f1g2h-3c3d-44e5-a6f7-789012345601';
        $letterFormatId2 = '9e0f1g2h-3c3d-44e5-a6f7-789012345602';

        if ($user1) {
            Letter::factory()->create([
                'id' => (string) Str::uuid(),
                'letter_format_id' => $letterFormatId1,
                'user_id' => $user1->id,
                'name' => 'Promotion Letter for John',
            ]);
        }

        if ($user2) {
            Letter::factory()->create([
                'id' => (string) Str::uuid(),
                'letter_format_id' => $letterFormatId2,
                'user_id' => $user2->id,
                'name' => 'Resignation Letter for Jane',
            ]);
        }
    }
}
