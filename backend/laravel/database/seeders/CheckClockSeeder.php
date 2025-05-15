```php
<?php

namespace Database\Seeders;

use App\Models\CheckClock;
use Illuminate\Database\Seeder;

class CheckClockSeeder extends Seeder
{
    public function run(): void
    {
        CheckClock::factory()->create([
            'id' => '2e3f4g5h-6i7j-98k9-f0l1-123456789001',
            'user_id' => '550e8400-e29b-41d4-a716-446655440002',
            'check_clock_type' => 1,
            'check_clock_time' => '08:05:00',
        ]);

        CheckClock::factory()->create([
            'id' => '2e3f4g5h-6i7j-98k9-f0l1-123456789002',
            'user_id' => '550e8400-e29b-41d4-a716-446655440003',
            'check_clock_type' => 1,
            'check_clock_time' => '20:10:00',
        ]);
    }
}
```
