<?php

namespace Database\Seeders;

use App\Models\CheckClock;
use Illuminate\Database\Seeder;

class CheckClockSeeder extends Seeder
{
    public function run(): void
    {
    CheckClock::factory()->create([
            "id" => "dj4k5l6m-7g7h-88i9-e0j1-123456789001",
                "user_id" => "550e8400-e29b-41d4-a716-446655440002",
                "check_clock_type" => 1,
                "check_clock_time" => "09:00:00",
        ]);
    CheckClock::factory()->create([
            "id" => "dj4k5l6m-7g7h-88i9-e0j1-123456789002",
                "user_id" => "550e8400-e29b-41d4-a716-446655440003",
                "check_clock_type" => 2,
                "check_clock_time" => "22:00:00",
        ]);

    }
}