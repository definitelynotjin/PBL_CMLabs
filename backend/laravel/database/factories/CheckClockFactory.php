<?php

namespace Database\Factories;

use App\Models\CheckClock;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CheckClockFactory extends Factory
{
    protected $model = CheckClock::class;

    public function definition(): array
    {
        return [
            "id" => (string) Str::uuid(),
            "user_id" => User::factory(),
            "check_clock_type" => $this->faker->numberBetween(1, 2),
            "check_clock_time" => $this->faker->time("H:i:s"),
            "created_at" => now(),
            "updated_at" => now(),
        ];
    }
}
