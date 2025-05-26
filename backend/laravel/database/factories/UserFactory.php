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
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'phone_number' => $this->faker->unique()->numerify('+628##########'), // Indonesian phone number format
            'is_admin' => $this->faker->boolean(10), // 10% chance of being admin
        ];
    }
}
