<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('check_clocks', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Use UUID for consistency with users
            $table->uuid('user_id')->constrained('users')->onDelete('cascade'); // Foreign key to users
            $table->enum('check_clock_type', [1, 2])->default(1); // 1: in, 2: out
            $table->time('check_clock_time');
            $table->decimal('latitude', 10, 8)->nullable(); // Optional geolocation
            $table->decimal('longitude', 11, 8)->nullable(); // Optional geolocation
            $table->timestamps();
            $table->softDeletes(); // Add soft deletes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('check_clocks', function (Blueprint $table) {
            $table->dropForeign(['user_id']); // Drop the foreign key constraint (now exists)
        });
        Schema::dropIfExists('check_clocks'); // Drop the table
    }
};
