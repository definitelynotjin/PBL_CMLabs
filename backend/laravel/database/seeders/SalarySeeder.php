```php
<?php

namespace Database\Seeders;

use App\Models\Salary;
use Illuminate\Database\Seeder;

class SalarySeeder extends Seeder
{
    public function run(): void
    {
        Salary::factory()->create([
            'id' => '0c1d2e3f-4g5h-76i7-d8j9-901234567801',
            'user_id' => '550e8400-e29b-41d4-a716-446655440002',
            'type' => 1,
            'rate' => 25.50,
            'effective_date' => '2025-01-01',
        ]);

        Salary::factory()->create([
            'id' => '0c1d2e3f-4g5h-76i7-d8j9-901234567802',
            'user_id' => '550e8400-e29b-41d4-a716-446655440003',
            'type' => 1,
            'rate' => 30.00,
            'effective_date' => '2025-01-01',
        ]);
    }
}

