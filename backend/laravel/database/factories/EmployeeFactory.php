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
            'user_id' => null, // To be set by seeder or explicitly
            'ck_settings_id' => null, // To be set by seeder or explicitly
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'gender' => $this->faker->randomElement(['M', 'F']),
            'address' => $this->faker->address(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->unique()->phoneNumber(),
            'position' => $this->faker->jobTitle(),
            'department' => $this->faker->randomElement(['HR', 'Engineering', 'Sales', 'Marketing']),
            'birth_date' => $this->faker->date('Y-m-d', '2000-01-01'),
            'join_date' => $this->faker->date('Y-m-d', 'now'),
            'employment_status' => $this->faker->randomElement(['Permanent', 'Contract', 'Intern']),
        ];
    }

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
