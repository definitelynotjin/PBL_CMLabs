<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create 2 users (or as many as you need)
        User::factory()->count(2)->create();
    }
}
