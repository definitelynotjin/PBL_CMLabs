<?php

namespace Database\Seeders;

use App\Models\Salary;
use Illuminate\Database\Seeder;

class SalarySeeder extends Seeder
{
    public function run(): void
    {
    Salary::factory()->create([
            "id" => "bg2i3j4k-5e5f-66g7-c8h9-901234567801",
                "user_id" => "550e8400-e29b-41d4-a716-446655440002",
                "type" => 1,
                "rate" => 5000.00,
                "effective_date" => "2025-01-01",
        ]);
    Salary::factory()->create([
            "id" => "bg2i3j4k-5e5f-66g7-c8h9-901234567802",
                "user_id" => "550e8400-e29b-41d4-a716-446655440003",
                "type" => 2,
                "rate" => 6000.00,
                "effective_date" => "2025-01-01",
        ]);

    }
}