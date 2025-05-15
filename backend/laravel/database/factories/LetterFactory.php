<?php

namespace Database\Factories;

use App\Models\Letter;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LetterFactory extends Factory
{
    protected $model = Letter::class;

    public function definition(): array
    {
        return [
            "id" => (string) Str::uuid(),
            "letter_format_id" => LetterFormat::factory(),
            "user_id" => User::factory(),
            "name" => $this->faker->sentence(3),
            "created_at" => now(),
            "updated_at" => now(),
        ];
    }
}