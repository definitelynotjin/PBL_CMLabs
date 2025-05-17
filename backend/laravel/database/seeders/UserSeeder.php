<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            "id" => "550e8400-e29b-41d4-a716-446655440001",
            "email" => "admin@example.com",
            "password" => bcrypt("password123"),
            "is_admin" => true,
        ]);
        User::factory()->create([
            "id" => "550e8400-e29b-41d4-a716-446655440002",
            "email" => "employee1@example.com",
            "password" => bcrypt("password456"),
            "is_admin" => false,
        ]);
        User::factory()->create([
            "id" => "550e8400-e29b-41d4-a716-446655440003",
            "email" => "employee2@example.com",
            "password" => bcrypt("password789"),
            "is_admin" => false,
        ]);
    }
}
