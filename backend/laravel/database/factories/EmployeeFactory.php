<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\CheckClockSetting;
use Ramsey\Uuid\Uuid;

class EmployeeFactory extends Factory
{
    protected $model = \App\Models\Employee::class;

    public function definition()
    {
        return [
            'id' => Uuid::uuid4()->toString(),
            'user_id' => null, // Set by seeder
            'ck_settings_id' => null, // Set by seeder
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'gender' => $this->faker->randomElement(['M', 'F', 'O']),
            'address' => $this->faker->address(),
        ];
    }

    // Optional: Define a state to create related models if needed outside the seeder
    public function withRelatedModels()
    {
        return $this->state(function (array $attributes) {
            return [
                'user_id' => User::factory()->create()->id,
                'ck_settings_id' => CheckClockSetting::factory()->create()->id,
            ];
        });
    }
}
