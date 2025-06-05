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
        Schema::create('check_clock_settings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name'); // Name of the schedule type
            $table->tinyInteger('type'); // 0: WFO, 1: WFA, 2: Hybrid
            $table->decimal('latitude', 10, 7)->nullable(); // Optional location for WFO/Hybrid
            $table->decimal('longitude', 10, 7)->nullable();
            $table->integer('radius')->nullable(); // in meters
            $table->timestamps();
            $table->softDeletes(); // deleted_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_clock_settings');
    }
};
