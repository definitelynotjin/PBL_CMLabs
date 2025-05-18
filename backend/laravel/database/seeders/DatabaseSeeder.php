<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\CheckClockSetting;
use App\Models\Employee;
use App\Models\CheckClockSettingTime;
use App\Models\CheckClock;
use App\Models\Salary;
use App\Models\LetterFormat;
use App\Models\Letter;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create users
        User::factory()->count(5)->create(['is_admin' => true]);
        User::factory()->count(20)->create(['is_admin' => false]);

        // Create check clock settings
        CheckClockSetting::factory()->count(3)->create();

        // Create employees
        Employee::factory()->count(20)->create();

        // Create check clock setting times
        CheckClockSettingTime::factory()->count(10)->create();

        // Create check clocks
        CheckClock::factory()->count(50)->create();

        // Create salaries
        Salary::factory()->count(20)->create();

        // Create letter formats
        LetterFormat::factory()->count(5)->create();

        // Create letters
        Letter::factory()->count(15)->create();
    }
}
