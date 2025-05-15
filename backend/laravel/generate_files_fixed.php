
   <?php

    require __DIR__ . '/vendor/autoload.php';

    use Illuminate\Support\Str;

    $app = require_once __DIR__ . '/bootstrap/app.php';
    $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

    // Define the structure for each table
    $tables = [
        'users' => [
            'migration' => [
                'fields' => [
                    '$table->string("id", 36)->primary();',
                    '$table->string("email", 100)->unique();',
                    '$table->string("password", 255);',
                    '$table->boolean("is_admin");',
                    '$table->timestamps();',
                ],
                'timestamp' => '000001',
            ],
            'model' => [
                'extends' => 'Authenticatable',
                'traits' => ['HasFactory'],
                'properties' => [
                    'protected $table = "users";',
                    'protected $primaryKey = "id";',
                    'public $incrementing = false;',
                    'protected $keyType = "string";',
                    'protected $fillable = ["id", "email", "password", "is_admin"];',
                    'protected $casts = ["is_admin" => "boolean"];',
                ],
                'methods' => [
                    'public function employees() { return $this->hasMany(Employee::class, "user_id"); }',
                    'public function letters() { return $this->hasMany(Letter::class, "user_id"); }',
                    'public function salaries() { return $this->hasMany(Salary::class, "user_id"); }',
                    'public function checkClocks() { return $this->hasMany(CheckClock::class, "user_id"); }',
                ],
            ],
            'factory' => [
                'fields' => [
                    '"id" => (string) Str::uuid(),',
                    '"email" => $this->faker->unique()->safeEmail,',
                    '"password" => bcrypt("password"),',
                    '"is_admin" => false,',
                ],
            ],
            'controller' => [
                'validations' => [
                    'store' => [
                        '"email" => "required|email|unique:users",',
                        '"password" => "required|string|min:8",',
                        '"is_admin" => "required|boolean",',
                    ],
                    'update' => [
                        '"email" => "sometimes|email|unique:users,email," . $id,',
                        '"password" => "sometimes|string|min:8",',
                        '"is_admin" => "sometimes|boolean",',
                    ],
                ],
            ],
            'seeder' => [
                'records' => [
                    [
                        '"id" => "550e8400-e29b-41d4-a716-446655440001",',
                        '"email" => "admin@example.com",',
                        '"password" => bcrypt("password123"),',
                        '"is_admin" => true,',
                    ],
                    [
                        '"id" => "550e8400-e29b-41d4-a716-446655440002",',
                        '"email" => "employee1@example.com",',
                        '"password" => bcrypt("password456"),',
                        '"is_admin" => false,',
                    ],
                    [
                        '"id" => "550e8400-e29b-41d4-a716-446655440003",',
                        '"email" => "employee2@example.com",',
                        '"password" => bcrypt("password789"),',
                        '"is_admin" => false,',
                    ],
                ],
            ],
        ],
        'check_clock_settings' => [
            'migration' => [
                'fields' => [
                    '$table->string("id", 36)->primary();',
                    '$table->string("name", 50);',
                    '$table->integer("type");',
                    '$table->timestamps();',
                    '$table->string("deleted_at", 30)->nullable();',
                ],
                'timestamp' => '000002',
            ],
            'model' => [
                'extends' => 'Model',
                'traits' => ['HasFactory'],
                'properties' => [
                    'protected $table = "check_clock_settings";',
                    'protected $primaryKey = "id";',
                    'public $incrementing = false;',
                    'protected $keyType = "string";',
                    'protected $fillable = ["id", "name", "type", "created_at", "updated_at", "deleted_at"];',
                ],
                'methods' => [
                    'public function employees() { return $this->hasMany(Employee::class, "ck_settings_id"); }',
                    'public function checkClockSettingTimes() { return $this->hasMany(CheckClockSettingTime::class, "ck_settings_id"); }',
                ],
            ],
            'factory' => [
                'fields' => [
                    '"id" => (string) Str::uuid(),',
                    '"name" => $this->faker->word,',
                    '"type" => $this->faker->numberBetween(1, 2),',
                    '"created_at" => now(),',
                    '"updated_at" => now(),',
                ],
            ],
            'controller' => [
                'validations' => [
                    'store' => [
                        '"name" => "required|string|max:50",',
                        '"type" => "required|integer",',
                    ],
                    'update' => [
                        '"name" => "sometimes|string|max:50",',
                        '"type" => "sometimes|integer",',
                    ],
                ],
            ],
            'seeder' => [
                'records' => [
                    [
                        '"id" => "6f7c8d9e-0a1b-42c3-94d5-567890123401",',
                        '"name" => "Standard Shift",',
                        '"type" => 1,',
                    ],
                    [
                        '"id" => "6f7c8d9e-0a1b-42c3-94d5-567890123402",',
                        '"name" => "Night Shift",',
                        '"type" => 2,',
                    ],
                ],
            ],
        ],
        'employees' => [
            'migration' => [
                'fields' => [
                    '$table->string("id", 36)->primary();',
                    '$table->string("user_id", 36);',
                    '$table->string("ck_settings_id", 36);',
                    '$table->string("first_name", 100);',
                    '$table->string("last_name", 100);',
                    '$table->char("gender", 1);',
                    '$table->text("address")->nullable();',
                    '$table->timestamps();',
                    '$table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");',
                    '$table->foreign("ck_settings_id")->references("id")->on("check_clock_settings")->onDelete("cascade");',
                ],
                'timestamp' => '000003',
            ],
            'model' => [
                'extends' => 'Model',
                'traits' => ['HasFactory'],
                'properties' => [
                    'protected $table = "employees";',
                    'protected $primaryKey = "id";',
                    'public $incrementing = false;',
                    'protected $keyType = "string";',
                    'protected $fillable = ["id", "user_id", "ck_settings_id", "first_name", "last_name", "gender", "address"];',
                ],
                'methods' => [
                    'public function user() { return $this->belongsTo(User::class, "user_id"); }',
                    'public function checkClockSetting() { return $this->belongsTo(CheckClockSetting::class, "ck_settings_id"); }',
                ],
            ],
            'factory' => [
                'fields' => [
                    '"id" => (string) Str::uuid(),',
                    '"user_id" => User::factory(),',
                    '"ck_settings_id" => CheckClockSetting::factory(),',
                    '"first_name" => $this->faker->firstName,',
                    '"last_name" => $this->faker->lastName,',
                    '"gender" => $this->faker->randomElement(["M", "F"]),',
                    '"address" => $this->faker->address,',
                ],
            ],
            'controller' => [
                'validations' => [
                    'store' => [
                        '"user_id" => "required|exists:users,id",',
                        '"ck_settings_id" => "required|exists:check_clock_settings,id",',
                        '"first_name" => "required|string|max:100",',
                        '"last_name" => "required|string|max:100",',
                        '"gender" => "required|in:M,F",',
                        '"address" => "nullable|string",',
                    ],
                    'update' => [
                        '"user_id" => "sometimes|exists:users,id",',
                        '"ck_settings_id" => "sometimes|exists:check_clock_settings,id",',
                        '"first_name" => "sometimes|string|max:100",',
                        '"last_name" => "sometimes|string|max:100",',
                        '"gender" => "sometimes|in:M,F",',
                        '"address" => "nullable|string",',
                    ],
                ],
            ],
            'seeder' => [
                'records' => [
                    [
                        '"id" => "8c9d0e1f-2b2c-43d4-95e6-678901234501",',
                        '"user_id" => "550e8400-e29b-41d4-a716-446655440002",',
                        '"ck_settings_id" => "6f7c8d9e-0a1b-42c3-94d5-567890123401",',
                        '"first_name" => "John",',
                        '"last_name" => "Doe",',
                        '"gender" => "M",',
                        '"address" => "123 Main St",',
                    ],
                    [
                        '"id" => "8c9d0e1f-2b2c-43d4-95e6-678901234502",',
                        '"user_id" => "550e8400-e29b-41d4-a716-446655440003",',
                        '"ck_settings_id" => "6f7c8d9e-0a1b-42c3-94d5-567890123402",',
                        '"first_name" => "Jane",',
                        '"last_name" => "Smith",',
                        '"gender" => "F",',
                        '"address" => "456 Elm St",',
                    ],
                ],
            ],
        ],
        'letter_formats' => [
            'migration' => [
                'fields' => [
                    '$table->string("id", 36)->primary();',
                    '$table->string("name", 100);',
                    '$table->text("content");',
                    '$table->integer("status");',
                    '$table->timestamps();',
                    '$table->string("deleted_at", 30)->nullable();',
                ],
                'timestamp' => '000004',
            ],
            'model' => [
                'extends' => 'Model',
                'traits' => ['HasFactory'],
                'properties' => [
                    'protected $table = "letter_formats";',
                    'protected $primaryKey = "id";',
                    'public $incrementing = false;',
                    'protected $keyType = "string";',
                    'protected $fillable = ["id", "name", "content", "status", "created_at", "updated_at", "deleted_at"];',
                ],
                'methods' => [
                    'public function letters() { return $this->hasMany(Letter::class, "letter_format_id"); }',
                ],
            ],
            'factory' => [
                'fields' => [
                    '"id" => (string) Str::uuid(),',
                    '"name" => $this->faker->sentence(3),',
                    '"content" => $this->faker->paragraph,',
                    '"status" => $this->faker->numberBetween(0, 1),',
                    '"created_at" => now(),',
                    '"updated_at" => now(),',
                ],
            ],
            'controller' => [
                'validations' => [
                    'store' => [
                        '"name" => "required|string|max:100",',
                        '"content" => "required|string",',
                        '"status" => "required|integer",',
                    ],
                    'update' => [
                        '"name" => "sometimes|string|max:100",',
                        '"content" => "sometimes|string",',
                        '"status" => "sometimes|integer",',
                    ],
                ],
            ],
            'seeder' => [
                'records' => [
                    [
                        '"id" => "9e0f1g2h-3c3d-44e5-a6f7-789012345601",',
                        '"name" => "Promotion Letter",',
                        '"content" => "Dear [Name], We are pleased to promote you...",',
                        '"status" => 1,',
                    ],
                    [
                        '"id" => "9e0f1g2h-3c3d-44e5-a6f7-789012345602",',
                        '"name" => "Resignation Letter",',
                        '"content" => "Dear [Name], I hereby resign from my position...",',
                        '"status" => 1,',
                    ],
                ],
            ],
        ],
        'letters' => [
            'migration' => [
                'fields' => [
                    '$table->string("id", 36)->primary();',
                    '$table->string("letter_format_id", 36);',
                    '$table->string("user_id", 36);',
                    '$table->string("name", 100);',
                    '$table->timestamps();',
                    '$table->string("deleted_at", 30)->nullable();',
                    '$table->foreign("letter_format_id")->references("id")->on("letter_formats")->onDelete("cascade");',
                    '$table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");',
                ],
                'timestamp' => '000005',
            ],
            'model' => [
                'extends' => 'Model',
                'traits' => ['HasFactory'],
                'properties' => [
                    'protected $table = "letters";',
                    'protected $primaryKey = "id";',
                    'public $incrementing = false;',
                    'protected $keyType = "string";',
                    'protected $fillable = ["id", "letter_format_id", "user_id", "name", "created_at", "updated_at", "deleted_at"];',
                ],
                'methods' => [
                    'public function letterFormat() { return $this->belongsTo(LetterFormat::class, "letter_format_id"); }',
                    'public function user() { return $this->belongsTo(User::class, "user_id"); }',
                ],
            ],
            'factory' => [
                'fields' => [
                    '"id" => (string) Str::uuid(),',
                    '"letter_format_id" => LetterFormat::factory(),',
                    '"user_id" => User::factory(),',
                    '"name" => $this->faker->sentence(3),',
                    '"created_at" => now(),',
                    '"updated_at" => now(),',
                ],
            ],
            'controller' => [
                'validations' => [
                    'store' => [
                        '"letter_format_id" => "required|exists:letter_formats,id",',
                        '"user_id" => "required|exists:users,id",',
                        '"name" => "required|string|max:100",',
                    ],
                    'update' => [
                        '"letter_format_id" => "sometimes|exists:letter_formats,id",',
                        '"user_id" => "sometimes|exists:users,id",',
                        '"name" => "sometimes|string|max:100",',
                    ],
                ],
            ],
            'seeder' => [
                'records' => [
                    [
                        '"id" => "af1h2i3j-4d4e-55f6-b7g8-890123456701",',
                        '"letter_format_id" => "9e0f1g2h-3c3d-44e5-a6f7-789012345601",',
                        '"user_id" => "550e8400-e29b-41d4-a716-446655440002",',
                        '"name" => "Promotion Letter for John",',
                    ],
                    [
                        '"id" => "af1h2i3j-4d4e-55f6-b7g8-890123456702",',
                        '"letter_format_id" => "9e0f1g2h-3c3d-44e5-a6f7-789012345602",',
                        '"user_id" => "550e8400-e29b-41d4-a716-446655440003",',
                        '"name" => "Resignation Letter for Jane",',
                    ],
                ],
            ],
        ],
        'salaries' => [
            'migration' => [
                'fields' => [
                    '$table->string("id", 36)->primary();',
                    '$table->string("user_id", 36);',
                    '$table->integer("type");',
                    '$table->float("rate");',
                    '$table->date("effective_date");',
                    '$table->timestamps();',
                    '$table->string("deleted_at", 30)->nullable();',
                    '$table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");',
                ],
                'timestamp' => '000006',
            ],
            'model' => [
                'extends' => 'Model',
                'traits' => ['HasFactory'],
                'properties' => [
                    'protected $table = "salaries";',
                    'protected $primaryKey = "id";',
                    'public $incrementing = false;',
                    'protected $keyType = "string";',
                    'protected $fillable = ["id", "user_id", "type", "rate", "effective_date", "created_at", "updated_at", "deleted_at"];',
                ],
                'methods' => [
                    'public function user() { return $this->belongsTo(User::class, "user_id"); }',
                ],
            ],
            'factory' => [
                'fields' => [
                    '"id" => (string) Str::uuid(),',
                    '"user_id" => User::factory(),',
                    '"type" => $this->faker->numberBetween(1, 3),',
                    '"rate" => $this->faker->randomFloat(2, 1000, 10000),',
                    '"effective_date" => $this->faker->date(),',
                    '"created_at" => now(),',
                    '"updated_at" => now(),',
                ],
            ],
            'controller' => [
                'validations' => [
                    'store' => [
                        '"user_id" => "required|exists:users,id",',
                        '"type" => "required|integer",',
                        '"rate" => "required|numeric",',
                        '"effective_date" => "required|date",',
                    ],
                    'update' => [
                        '"user_id" => "sometimes|exists:users,id",',
                        '"type" => "sometimes|integer",',
                        '"rate" => "sometimes|numeric",',
                        '"effective_date" => "sometimes|date",',
                    ],
                ],
            ],
            'seeder' => [
                'records' => [
                    [
                        '"id" => "bg2i3j4k-5e5f-66g7-c8h9-901234567801",',
                        '"user_id" => "550e8400-e29b-41d4-a716-446655440002",',
                        '"type" => 1,',
                        '"rate" => 5000.00,',
                        '"effective_date" => "2025-01-01",',
                    ],
                    [
                        '"id" => "bg2i3j4k-5e5f-66g7-c8h9-901234567802",',
                        '"user_id" => "550e8400-e29b-41d4-a716-446655440003",',
                        '"type" => 2,',
                        '"rate" => 6000.00,',
                        '"effective_date" => "2025-01-01",',
                    ],
                ],
            ],
        ],
        'check_clock_setting_times' => [
            'migration' => [
                'fields' => [
                    '$table->string("id", 36)->primary();',
                    '$table->string("ck_settings_id", 36);',
                    '$table->date("day");',
                    '$table->time("clock_in");',
                    '$table->time("clock_out");',
                    '$table->time("break_start");',
                    '$table->time("break_end");',
                    '$table->timestamps();',
                    '$table->string("deleted_at", 30)->nullable();',
                    '$table->foreign("ck_settings_id")->references("id")->on("check_clock_settings")->onDelete("cascade");',
                ],
                'timestamp' => '000007',
            ],
            'model' => [
                'extends' => 'Model',
                'traits' => ['HasFactory'],
                'properties' => [
                    'protected $table = "check_clock_setting_times";',
                    'protected $primaryKey = "id";',
                    'public $incrementing = false;',
                    'protected $keyType = "string";',
                    'protected $fillable = ["id", "ck_settings_id", "day", "clock_in", "clock_out", "break_start", "break_end", "created_at", "updated_at", "deleted_at"];',
                ],
                'methods' => [
                    'public function checkClockSetting() { return $this->belongsTo(CheckClockSetting::class, "ck_settings_id"); }',
                ],
            ],
            'factory' => [
                'fields' => [
                    '"id" => (string) Str::uuid(),',
                    '"ck_settings_id" => CheckClockSetting::factory(),',
                    '"day" => $this->faker->date(),',
                    '"clock_in" => $this->faker->time("H:i:s", "09:00:00"),',
                    '"clock_out" => $this->faker->time("H:i:s", "17:00:00"),',
                    '"break_start" => $this->faker->time("H:i:s", "12:00:00"),',
                    '"break_end" => $this->faker->time("H:i:s", "13:00:00"),',
                    '"created_at" => now(),',
                    '"updated_at" => now(),',
                ],
            ],
            'controller' => [
                'validations' => [
                    'store' => [
                        '"ck_settings_id" => "required|exists:check_clock_settings,id",',
                        '"day" => "required|date",',
                        '"clock_in" => "required|date_format:H:i:s",',
                        '"clock_out" => "required|date_format:H:i:s",',
                        '"break_start" => "required|date_format:H:i:s",',
                        '"break_end" => "required|date_format:H:i:s",',
                    ],
                    'update' => [
                        '"ck_settings_id" => "sometimes|exists:check_clock_settings,id",',
                        '"day" => "sometimes|date",',
                        '"clock_in" => "sometimes|date_format:H:i:s",',
                        '"clock_out" => "sometimes|date_format:H:i:s",',
                        '"break_start" => "sometimes|date_format:H:i:s",',
                        '"break_end" => "sometimes|date_format:H:i:s",',
                    ],
                ],
            ],
            'seeder' => [
                'records' => [
                    [
                        '"id" => "ci3j4k5l-6f6g-77h8-d9i0-012345678901",',
                        '"ck_settings_id" => "6f7c8d9e-0a1b-42c3-94d5-567890123401",',
                        '"day" => "2025-05-01",',
                        '"clock_in" => "09:00:00",',
                        '"clock_out" => "17:00:00",',
                        '"break_start" => "12:00:00",',
                        '"break_end" => "13:00:00",',
                    ],
                    [
                        '"id" => "ci3j4k5l-6f6g-77h8-d9i0-012345678902",',
                        '"ck_settings_id" => "6f7c8d9e-0a1b-42c3-94d5-567890123402",',
                        '"day" => "2025-05-01",',
                        '"clock_in" => "22:00:00",',
                        '"clock_out" => "06:00:00",',
                        '"break_start" => "02:00:00",',
                        '"break_end" => "03:00:00",',
                    ],
                ],
            ],
        ],
        'check_clocks' => [
            'migration' => [
                'fields' => [
                    '$table->string("id", 36)->primary();',
                    '$table->string("user_id", 36);',
                    '$table->integer("check_clock_type");',
                    '$table->time("check_clock_time");',
                    '$table->timestamps();',
                    '$table->string("deleted_at", 30)->nullable();',
                    '$table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");',
                ],
                'timestamp' => '000008',
            ],
            'model' => [
                'extends' => 'Model',
                'traits' => ['HasFactory'],
                'properties' => [
                    'protected $table = "check_clocks";',
                    'protected $primaryKey = "id";',
                    'public $incrementing = false;',
                    'protected $keyType = "string";',
                    'protected $fillable = ["id", "user_id", "check_clock_type", "check_clock_time", "created_at", "updated_at", "deleted_at"];',
                ],
                'methods' => [
                    'public function user() { return $this->belongsTo(User::class, "user_id"); }',
                ],
            ],
            'factory' => [
                'fields' => [
                    '"id" => (string) Str::uuid(),',
                    '"user_id" => User::factory(),',
                    '"check_clock_type" => $this->faker->numberBetween(1, 2),',
                    '"check_clock_time" => $this->faker->time("H:i:s"),',
                    '"created_at" => now(),',
                    '"updated_at" => now(),',
                ],
            ],
            'controller' => [
                'validations' => [
                    'store' => [
                        '"user_id" => "required|exists:users,id",',
                        '"check_clock_type" => "required|integer",',
                        '"check_clock_time" => "required|date_format:H:i:s",',
                    ],
                    'update' => [
                        '"user_id" => "sometimes|exists:users,id",',
                        '"check_clock_type" => "sometimes|integer",',
                        '"check_clock_time" => "sometimes|date_format:H:i:s",',
                    ],
                ],
            ],
            'seeder' => [
                'records' => [
                    [
                        '"id" => "dj4k5l6m-7g7h-88i9-e0j1-123456789001",',
                        '"user_id" => "550e8400-e29b-41d4-a716-446655440002",',
                        '"check_clock_type" => 1,',
                        '"check_clock_time" => "09:00:00",',
                    ],
                    [
                        '"id" => "dj4k5l6m-7g7h-88i9-e0j1-123456789002",',
                        '"user_id" => "550e8400-e29b-41d4-a716-446655440003",',
                        '"check_clock_type" => 2,',
                        '"check_clock_time" => "22:00:00",',
                    ],
                ],
            ],
        ],
    ];

    // Helper function to write files
    function writeFile($path, $content)
    {
        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0755, true);
        }
        file_put_contents($path, $content);
        echo "Created: $path\n";
    }

    // Generate Migration Files
    foreach ($tables as $table => $config) {
        $className = 'Create' . Str::studly($table) . 'Table';
        $fileName = 'database/migrations/2025_05_15_' . $config['migration']['timestamp'] . '_create_' . $table . '_table.php';
        $fields = implode("\n               ", $config['migration']['fields']);
$content = <<<PHP
   <?php

   use Illuminate\Database\Migrations\Migration;
   use Illuminate\Database\Schema\Blueprint;
   use Illuminate\Support\Facades\Schema;

   return new class extends Migration
   {
       public function up(): void
       {
           Schema::create('$table', function (Blueprint \$table) {
               {$fields}
           });
       }

       public function down(): void
       {
           Schema::dropIfExists('$table');
       }
   };
   PHP;

        writeFile($fileName, $content);
    }

    // Generate Model Files
    foreach ($tables as $table => $config) {
        $modelName = Str::studly(Str::singular($table));
        $fileName = "app/Models/$modelName.php";
        $extends = $config['model']['extends'];
        $traits = implode(', ', $config['model']['traits']);
        $properties = implode("\n    ", $config['model']['properties']);
        $methods = implode("\n    ", $config['model']['methods']);
        $content = <<<PHP
   <?php

   namespace App\Models;

   use Illuminate\Database\Eloquent\Factories\HasFactory;
   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Foundation\Auth\User as Authenticatable;

   class $modelName extends $extends
   {
       use $traits;

       $properties

       $methods
   }
   PHP;

        writeFile($fileName, $content);
    }

    // Generate Factory Files
    foreach ($tables as $table => $config) {
        $modelName = Str::studly(Str::singular($table));
        $fileName = "database/factories/{$modelName}Factory.php";
        $fields = implode("\n            ", $config['factory']['fields']);
        $content = <<<PHP
   <?php

   namespace Database\Factories;

   use App\Models\\$modelName;
   use Illuminate\Database\Eloquent\Factories\Factory;
   use Illuminate\Support\Str;

   class {$modelName}Factory extends Factory
   {
       protected \$model = $modelName::class;

       public function definition(): array
       {
           return [
               $fields
           ];
       }
   }
   PHP;

        writeFile($fileName, $content);
    }

    // Generate Controller Files
    foreach ($tables as $table => $config) {
        $modelName = Str::studly(Str::singular($table));
        $controllerName = "{$modelName}Controller";
        $fileName = "app/Http/Controllers/$controllerName.php";
        $storeValidations = implode("\n                    ", $config['controller']['validations']['store']);
        $updateValidations = implode("\n                    ", $config['controller']['validations']['update']);
        $content = <<<PHP
   <?php

   namespace App\Http\Controllers;

   use App\Models\\$modelName;
   use Illuminate\Http\Request;

   class $controllerName extends Controller
   {
       public function index()
       {
           return $modelName::all();
       }

       public function store(Request \$request)
       {
           \$validated = \$request->validate([
               $storeValidations
           ]);

           \$item = $modelName::create([
               'id' => (string) \Illuminate\Support\Str::uuid(),
               ...\$validated,
           ]);

           return response()->json(\$item, 201);
       }

       public function show(\$id)
       {
           return $modelName::findOrFail(\$id);
       }

       public function update(Request \$request, \$id)
       {
           \$item = $modelName::findOrFail(\$id);
           \$validated = \$request->validate([
               $updateValidations
           ]);

           \$item->update(\$validated);
           return response()->json(\$item);
       }

       public function destroy(\$id)
       {
           \$item = $modelName::findOrFail(\$id);
           \$item->delete();
           return response()->json(null, 204);
       }
   }
   PHP;

        writeFile($fileName, $content);
    }

    // Generate Seeder Files
    foreach ($tables as $table => $config) {
        $modelName = Str::studly(Str::singular($table));
        $seederName = "{$modelName}Seeder";
        $fileName = "database/seeders/$seederName.php";
        $records = '';
        foreach ($config['seeder']['records'] as $record) {
            $fields = implode("\n                ", $record);
            $records .= <<<PHP
       $modelName::factory()->create([
               $fields
           ]);

   PHP;
        }
        $content = <<<PHP
   <?php

   namespace Database\Seeders;

   use App\Models\\$modelName;
   use Illuminate\Database\Seeder;

   class $seederName extends Seeder
   {
       public function run(): void
       {
   $records
       }
   }
   PHP;

        writeFile($fileName, $content);
    }

    // Generate DatabaseSeeder
    $seederCalls = '';
    foreach ($tables as $table => $config) {
        $modelName = Str::studly(Str::singular($table));
        $seederCalls .= "            {$modelName}Seeder::class,\n";
    }
    $fileName = 'database/seeders/DatabaseSeeder.php';
    $content = <<<PHP
   <?php

   namespace Database\Seeders;

   use Illuminate\Database\Seeder;

   class DatabaseSeeder extends Seeder
   {
       public function run(): void
       {
           \$this->call([
   $seederCalls
           ]);
       }
   }
   PHP;

    writeFile($fileName, $content);

    // Generate Routes
    $routes = '';
    foreach ($tables as $table => $config) {
        $modelName = Str::studly(Str::singular($table));
        $routeName = Str::kebab($table);
        $routes .= "use App\\Http\\Controllers\\{$modelName}Controller;\n";
    }
    $routeResources = '';
    foreach ($tables as $table => $config) {
        $modelName = Str::studly(Str::singular($table));
        $routeName = Str::kebab($table);
        $routeResources .= "    '$routeName' => {$modelName}Controller::class,\n";
    }
    $fileName = 'routes/api.php';
    $content = <<<PHP
   <?php

   use Illuminate\Support\Facades\Route;

   $routes

   Route::apiResources([
   $routeResources
   ]);
   PHP;

    writeFile($fileName, $content);

    echo "All files generated successfully!\n";
