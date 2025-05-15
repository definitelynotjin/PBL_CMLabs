<?php

namespace Database\Factories;

use App\Models\CheckClockSetting;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CheckClockSettingFactory extends Factory
{
    protected $model = CheckClockSetting::class;

    public function definition(): array
    {
        return [
            "id" => (string) Str::uuid(),
            "name" => $this->faker->word,
            "type" => $this->faker->numberBetween(1, 2),
            "created_at" => now(),
            "updated_at" => now(),
        ];
    }
}