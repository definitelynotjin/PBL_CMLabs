<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\CheckClockSetting;
use App\Models\CheckClockSettingTime;

class CheckClockSettingSeeder extends Seeder
{
    public function run(): void
    {
        // Create WFO CheckClockSetting
        $setting = CheckClockSetting::create([
            'id' => Str::uuid(),
            'name' => 'Kantor Malang',
            'type' => 0, // 0: WFO
            'latitude' => -7.9675,
            'longitude' => 112.6326,
            'radius' => 100, // 100 meters
        ]);

        // Days: Monday to Friday
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        foreach ($days as $day) {
            CheckClockSettingTime::create([
                'id' => Str::uuid(),
                'ck_settings_id' => $setting->id,
                'day' => $day,
                'clock_in' => '08:00:00',
                'clock_out' => '17:00:00',
                'break_start' => '12:00:00',
                'break_end' => '13:00:00',
            ]);
        }
    }
}
