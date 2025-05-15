<?php

namespace Database\Factories;

use App\Models\LetterFormat;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class LetterFormatFactory extends Factory
{
    protected $model = LetterFormat::class;

    public function definition(): array
    {
        return [
            "id" => (string) Str::uuid(),
            "name" => $this->faker->sentence(3),
            "content" => $this->faker->paragraph,
            "status" => $this->faker->numberBetween(0, 1),
            "created_at" => now(),
            "updated_at" => now(),
        ];
    }
}
