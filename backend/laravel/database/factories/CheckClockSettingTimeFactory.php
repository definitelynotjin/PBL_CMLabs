<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CheckClockSetting;
use Ramsey\Uuid\Uuid;

class CheckClockSettingTimeFactory extends Factory
{
    public function definition()
    {
        return [
            'id' => Uuid::uuid4()->toString(),
            'ck_settings_id' => CheckClockSetting::factory(),
            'day' => $this->faker->date('Y-m-d'),
            'clock_in' => '08:00:00',
            'clock_out' => '17:00:00',
            'break_start' => '12:00:00',
            'break_end' => '13:00:00',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
