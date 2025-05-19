<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Ramsey\Uuid\Uuid;

class CheckClockFactory extends Factory
{
    public function definition()
    {
        return [
            'id' => Uuid::uuid4()->toString(),
            'user_id' => User::factory(),
            'check_clock_type' => $this->faker->randomElement([0, 1]), // 0: In, 1: Out
            'check_clock_time' => $this->faker->time('H:i:s'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
