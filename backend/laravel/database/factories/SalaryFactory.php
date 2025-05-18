<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Ramsey\Uuid\Uuid;

class SalaryFactory extends Factory
{
    public function definition()
    {
        return [
            'id' => Uuid::uuid4()->toString(),
            'user_id' => User::factory(),
            'type' => $this->faker->randomElement([0, 1, 2]), // 0: Hourly, 1: Monthly, 2: Contract
            'rate' => $this->faker->randomFloat(2, 500000, 5000000),
            'efective_date' => $this->faker->date('Y-m-d'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
