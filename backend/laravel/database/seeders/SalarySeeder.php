<?php

namespace Database\Seeders;

use App\Models\Salary;
use App\Models\User;
use Illuminate\Database\Seeder;

class SalarySeeder extends Seeder
{
    public function run(): void
    {
        // Get all users from the database
        $users = User::all();

        // For each user, create a salary linked to that user
        foreach ($users as $index => $user) {
            Salary::factory()->create([
                'user_id' => $user->id,
                'type' => $index % 2 + 1,  // just alternating 1 and 2 for example
                'rate' => 5000 + ($index * 1000),
                'effective_date' => '2025-01-01',
            ]);
        }
    }
}
