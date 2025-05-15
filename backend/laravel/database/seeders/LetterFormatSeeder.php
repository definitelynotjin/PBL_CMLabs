```php
<?php

namespace Database\Seeders;

use App\Models\LetterFormat;
use Illuminate\Database\Seeder;

class LetterFormatSeeder extends Seeder
{
    public function run(): void
    {
        LetterFormat::factory()->create([
            'id' => '8a9b0c1d-2e3f-54g5-b6h7-789012345601',
            'name' => 'Offer Letter',
            'content' => 'Dear [Name], We are pleased to offer you...',
            'status' => 1,
        ]);

        LetterFormat::factory()->create([
            'id' => '8a9b0c1d-2e3f-54g5-b6h7-789012345602',
            'name' => 'Termination Letter',
            'content' => 'Dear [Name], This letter serves to inform...',
            'status' => 1,
        ]);
    }
}
