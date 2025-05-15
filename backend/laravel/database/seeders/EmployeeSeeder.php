<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
    Employee::factory()->create([
            "id" => "8c9d0e1f-2b2c-43d4-95e6-678901234501",
                "user_id" => "550e8400-e29b-41d4-a716-446655440002",
                "ck_settings_id" => "6f7c8d9e-0a1b-42c3-94d5-567890123401",
                "first_name" => "John",
                "last_name" => "Doe",
                "gender" => "M",
                "address" => "123 Main St",
        ]);
    Employee::factory()->create([
            "id" => "8c9d0e1f-2b2c-43d4-95e6-678901234502",
                "user_id" => "550e8400-e29b-41d4-a716-446655440003",
                "ck_settings_id" => "6f7c8d9e-0a1b-42c3-94d5-567890123402",
                "first_name" => "Jane",
                "last_name" => "Smith",
                "gender" => "F",
                "address" => "456 Elm St",
        ]);

    }
}