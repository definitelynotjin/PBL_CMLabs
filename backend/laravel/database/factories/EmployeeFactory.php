<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\User;
use App\Models\CheckClockSetting;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            "id" => (string) Str::uuid(),
            "user_id" => User::factory(),
            "ck_settings_id" => CheckClockSetting::factory(),
            "first_name" => $this->faker->firstName,
            "last_name" => $this->faker->lastName,
            "gender" => $this->faker->randomElement(["M", "F"]),
            "address" => $this->faker->address,
        ];
    }
}
