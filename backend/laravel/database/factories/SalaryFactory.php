<?php

namespace Database\Factories;

use App\Models\Salary;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class SalaryFactory extends Factory
{
    protected $model = Salary::class;

    public function definition(): array
    {
        return [
            "id" => (string) Str::uuid(),
            "user_id" => User::factory(),
            "type" => $this->faker->numberBetween(1, 3),
            "rate" => $this->faker->randomFloat(2, 1000, 10000),
            "effective_date" => $this->faker->date(),
            "created_at" => now(),
            "updated_at" => now(),
        ];
    }
}