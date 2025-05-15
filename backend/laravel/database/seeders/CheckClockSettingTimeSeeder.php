```php
<?php

namespace Database\Seeders;

use App\Models\CheckClockSettingTime;
use Illuminate\Database\Seeder;

class CheckClockSettingTimeSeeder extends Seeder
{
    public function run(): void
    {
        CheckClockSettingTime::factory()->create([
            'id' => '1d2e3f4g-5h6i-87j8-e9k0-012345678901',
            'ck_settings_id' => '6f7c8d9e-0a1b-42c3-94d5-567890123401',
            'day' => '2025-05-15',
            'clock_in' => '08:00:00',
            'clock_out' => '17:00:00',
            'break_start' => '12:00:00',
            'break_end' => '13:00:00',
        ]);

        CheckClockSettingTime::factory()->create([
            'id' => '1d2e3f4g-5h6i-87j8-e9k0-012345678902',
            'ck_settings_id' => '6f7c8d9e-0a1b-42c3-94d5-567890123402',
            'day' => '2025-05-15',
            'clock_in' => '20:00:00',
            'clock_out' => '05:00:00',
            'break_start' => '00:00:00',
            'break_end' => '01:00:00',
        ]);
    }
}
```
