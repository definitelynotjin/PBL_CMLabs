<?php

namespace Database\Seeders;

use App\Models\CheckClock;
use App\Models\User;
use Illuminate\Database\Seeder;

class CheckClockSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch some users from the database
        $user1 = User::first();
        $user2 = User::skip(1)->first();

        if ($user1) {
            CheckClock::factory()->create([
                // Remove fixed ID or generate unique one automatically
                'user_id' => $user1->id,
                'check_clock_type' => 1,
                'check_clock_time' => '09:00:00',
            ]);
        }

        if ($user2) {
            CheckClock::factory()->create([
                'user_id' => $user2->id,
                'check_clock_type' => 2,
                'check_clock_time' => '22:00:00',
            ]);
        }
    }
}
