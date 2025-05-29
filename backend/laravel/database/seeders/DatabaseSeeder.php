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
        $adminUsers = User::factory()->count(5)->create(['is_admin' => true]);
        $normalUsers = User::factory()->count(20)->create(['is_admin' => false]);

        $allUsers = $adminUsers->concat($normalUsers);

        // Create check clock settings
        $checkClockSettings = CheckClockSetting::factory()->count(3)->create();

        // Create employees linked to existing users and check clock settings
        foreach ($allUsers as $user) {
            Employee::factory()->create([
                'user_id' => $user->id,
                'ck_settings_id' => $checkClockSettings->random()->id,
            ]);
        }

        // Create other data
        CheckClockSettingTime::factory()->count(10)->create();
        CheckClock::factory()->count(50)->create();
        Salary::factory()->count(20)->create();
        LetterFormat::factory()->count(5)->create();
        Letter::factory()->count(15)->create();
    }
}
