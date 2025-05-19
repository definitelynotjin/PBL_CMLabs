<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Ramsey\Uuid\Uuid;

class LetterFormatFactory extends Factory
{
    public function definition()
    {
        return [
            'id' => Uuid::uuid4()->toString(),
            'name' => $this->faker->randomElement(['Employment Contract', 'Training Certificate', 'Performance Evaluation']),
            'content' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement([0, 1, 2]), // 0: Draft, 1: Active, 2: Archived
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
