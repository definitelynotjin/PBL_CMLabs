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
            'user_id' => User::factory(),
            'ck_settings_id' => CheckClockSetting::factory(),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'gender' => $this->faker->randomElement(['M', 'F']),
            'address' => $this->faker->address(),
        ];
    }
}
