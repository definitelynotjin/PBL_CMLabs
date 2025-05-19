<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Ramsey\Uuid\Uuid;

class CheckClockSettingFactory extends Factory
{
    public function definition()
    {
        return [
            'id' => Uuid::uuid4()->toString(),
            'name' => $this->faker->word() . ' Schedule',
            'type' => $this->faker->randomElement([0, 1, 2]), // 0: WFO, 1: WFA, 2: Hybrid
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
