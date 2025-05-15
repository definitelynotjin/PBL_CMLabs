<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition(): array
    {
        return [
            "id" => (string) Str::uuid(),
            "email" => $this->faker->unique()->safeEmail(),
            "password" => bcrypt("password"),
            "is_admin" => false,
        ];
    }
}
