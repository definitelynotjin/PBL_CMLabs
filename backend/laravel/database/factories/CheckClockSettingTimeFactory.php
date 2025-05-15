<?php

namespace Database\Factories;

use App\Models\CheckClockSettingTime;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CheckClockSettingTimeFactory extends Factory
{
    protected $model = CheckClockSettingTime::class;

    public function definition(): array
    {
        return [
            "id" => (string) Str::uuid(),
            "ck_settings_id" => CheckClockSetting::factory(),
            "day" => $this->faker->date(),
            "clock_in" => $this->faker->time("H:i:s", "09:00:00"),
            "clock_out" => $this->faker->time("H:i:s", "17:00:00"),
            "break_start" => $this->faker->time("H:i:s", "12:00:00"),
            "break_end" => $this->faker->time("H:i:s", "13:00:00"),
            "created_at" => now(),
            "updated_at" => now(),
        ];
    }
}