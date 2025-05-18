<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\LetterFormat;
use App\Models\User;
use Ramsey\Uuid\Uuid;

class LetterFactory extends Factory
{
    public function definition()
    {
        return [
            'id' => Uuid::uuid4()->toString(),
            'letter_format_id' => LetterFormat::factory(),
            'user_id' => User::factory(),
            'name' => $this->faker->sentence(4),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
