<?php

namespace Database\Seeders;

use App\Models\CheckClockSettingTime;
use Illuminate\Database\Seeder;

class CheckClockSettingTimeSeeder extends Seeder
{
    public function run(): void
    {
    CheckClockSettingTime::factory()->create([
            "id" => "ci3j4k5l-6f6g-77h8-d9i0-012345678901",
                "ck_settings_id" => "6f7c8d9e-0a1b-42c3-94d5-567890123401",
                "day" => "2025-05-01",
                "clock_in" => "09:00:00",
                "clock_out" => "17:00:00",
                "break_start" => "12:00:00",
                "break_end" => "13:00:00",
        ]);
    CheckClockSettingTime::factory()->create([
            "id" => "ci3j4k5l-6f6g-77h8-d9i0-012345678902",
                "ck_settings_id" => "6f7c8d9e-0a1b-42c3-94d5-567890123402",
                "day" => "2025-05-01",
                "clock_in" => "22:00:00",
                "clock_out" => "06:00:00",
                "break_start" => "02:00:00",
                "break_end" => "03:00:00",
        ]);

    }
}