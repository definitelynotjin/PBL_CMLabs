<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Ramsey\Uuid\Uuid;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'id' => Uuid::uuid4()->toString(),
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->unique()->numerify('+628##########'),
            'password' => Hash::make('password'),
            'role' => $this->faker->randomElement(['admin', 'employee']),
            'employee_id' => $this->faker->unique()->numerify('EMP###'),
            'is_active' => true,
            'email_verified_at' => now(),
            'phone_verified_at' => null,
            'remember_token' => \Str::random(10),
        ];
    }
}
