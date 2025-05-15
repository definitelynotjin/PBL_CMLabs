```php
<?php

namespace Database\Seeders;

use App\Models\Letter;
use Illuminate\Database\Seeder;

class LetterSeeder extends Seeder
{
    public function run(): void
    {
        Letter::factory()->create([
            'id' => '9b0c1d2e-3f4g-65h6-c7i8-890123456701',
            'letter_format_id' => '8a9b0c1d-2e3f-54g5-b6h7-789012345601',
            'user_id' => '550e8400-e29b-41d4-a716-446655440002',
            'name' => 'John Offer',
        ]);



        Letter::factory()->create([
            'id' => '9b0c1d2e-3f4g-65h6-c7i8-890123456702',
            'letter_format_id' => '8a9b0c1d-2e3f-54g5-b6h7-789012345602',
            'user_id' => '550e8400-e29b-41d4-a716-446655440003',
            'name' => 'Jane Termination',
        ]);
    }
}

