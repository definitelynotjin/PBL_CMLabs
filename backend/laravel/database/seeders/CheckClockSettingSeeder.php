```php
<?php

namespace Database\Seeders;

use App\Models\CheckClockSetting;
use Illuminate\Database\Seeder;

class CheckClockSettingSeeder extends Seeder
{
    public function run(): void
    {
        CheckClockSetting::factory()->create([
            'id' => '6f7c8d9e-0a1b-42c3-94d5-567890123401',
            'name' => 'Standard Shift',
            'type' => 1,
        ]);

        CheckClockSetting::factory()->create([
            'id' => '6f7c8d9e-0a1b-42c3-94d5-567890123402',
            'name' => 'Night Shift',
            'type' => 2,
        ]);
    }
}
```
