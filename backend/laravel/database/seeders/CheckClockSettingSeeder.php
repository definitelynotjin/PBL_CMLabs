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
        $locations = [
            [
                'id' => '58b66a88-1e4f-46c1-8e90-b47194983a9a',
                'name' => 'Kantor Malang',
                'type' => 0,
                'latitude' => -7.9675,
                'longitude' => 112.6326,
                'radius' => 100,
            ],
            [
                'id' => 'a3f1c0b4-5d7e-4fbb-bfe8-6d6b7a3b9a92', // replace with actual UUID string
                'name' => 'Kantor Jakarta',
                'type' => 0,
                'latitude' => -6.2088,
                'longitude' => 106.8456,
                'radius' => 100,
            ],
            [
                'id' => 'c21f07de-8e2f-4d9c-9d7b-f0a0d73637ae', // replace with actual UUID string
                'name' => 'Kantor Surabaya',
                'type' => 0,
                'latitude' => -7.2575,
                'longitude' => 112.7521,
                'radius' => 100,
            ],
        ];

        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        foreach ($locations as $loc) {
            // Use updateOrCreate to avoid duplicates if seeding multiple times
            $setting = CheckClockSetting::updateOrCreate(
                ['id' => $loc['id']],
                [
                    'name' => $loc['name'],
                    'type' => $loc['type'],
                    'latitude' => $loc['latitude'],
                    'longitude' => $loc['longitude'],
                    'radius' => $loc['radius'],
                ]
            );

            foreach ($days as $day) {
                CheckClockSettingTime::updateOrCreate(
                    [
                        'ck_settings_id' => $setting->id,
                        'day' => $day,
                    ],
                    [
                        'clock_in' => '08:00:00',
                        'clock_out' => '17:00:00',
                        'break_start' => '12:00:00',
                        'break_end' => '13:00:00',
                    ]
                );
            }
        }
    }
}
