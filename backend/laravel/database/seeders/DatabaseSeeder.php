<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CheckClockSettingSeeder::class,
            EmployeeSeeder::class,
            LetterFormatSeeder::class,
            LetterSeeder::class,
            SalarySeeder::class,
            CheckClockSettingTimeSeeder::class,
            CheckClockSeeder::class,

        ]);
    }
}