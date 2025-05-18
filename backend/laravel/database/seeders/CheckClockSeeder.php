<?php

namespace Database\Seeders;

use App\Models\CheckClock;
use App\Models\User;
use Illuminate\Database\Seeder;

class CheckClockSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::take(2)->get();

        foreach ($users as $index => $user) {
            CheckClock::factory()->create([
                'user_id' => $user->id,
                'check_clock_type' => $index + 1, // 1 for first user, 2 for second user
                'check_clock_time' => $index === 0 ? '09:00:00' : '22:00:00',
            ]);
        }
    }
}
