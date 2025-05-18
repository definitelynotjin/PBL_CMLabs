<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\CheckClockSetting;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        // Get some users to link employees to
        $users = User::all();
        if ($users->isEmpty()) {
            $this->command->info('No users found! Please run UserSeeder first.');
            return;
        }

        // Get clock settings
        $ck1 = CheckClockSetting::first();
        if (!$ck1) {
            $this->command->info('No CheckClockSetting found! Please run CheckClockSettingSeeder first.');
            return;
        }

        $ck2 = CheckClockSetting::skip(1)->first() ?? $ck1; // fallback if only one exists

        // Create employees with linked users and clock settings
        Employee::factory()->create([
            'user_id' => $users->first()->id,
            'ck_settings_id' => $ck1->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'gender' => 'M',
        ]);

        if ($users->count() > 1) {
            Employee::factory()->create([
                'user_id' => $users->skip(1)->first()->id,
                'ck_settings_id' => $ck2->id,
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'gender' => 'F',
            ]);
        }

        // You can add more employees similarly if you want
    }
}
