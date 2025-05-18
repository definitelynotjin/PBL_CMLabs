<?php

namespace Database\Seeders;

use App\Models\CheckClock;
use App\Models\User;
use Illuminate\Database\Seeder;

class CheckClockSettingTimeSeeder extends Seeder
{
    public function run(): void
    {
        // Get users to link check clocks
        $user1 = User::first();
        $user2 = User::skip(1)->first();

        if (!$user1) {
            $this->command->info('No users found for CheckClockSeeder.');
            return;
        }

        CheckClock::factory()->create([
            'id' => 'dj4k5l6m-7g7h-88i9-e0j1-123456789001',
            'user_id' => $user1->id,
            'check_clock_type' => 1,
            'check_clock_time' => '09:00:00',
        ]);

        if ($user2) {
            CheckClock::factory()->create([
                'id' => 'dj4k5l6m-7g7h-88i9-e0j1-123456789002',
                'user_id' => $user2->id,
                'check_clock_type' => 2,
                'check_clock_time' => '17:00:00',
            ]);
        }
    }
}
