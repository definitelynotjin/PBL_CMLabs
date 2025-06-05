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
        Schema::create('check_clock_setting_times', function (Blueprint $table) {
            $table->uuid('id')->primary(); // matches your model's UUID primary key
            $table->uuid('ck_settings_id'); // foreign key to check_clock_settings

            $table->string('day'); // e.g. "Monday", "Tuesday" as text

            // Use `time` type for times (Laravel & DB support it)
            $table->time('clock_in');
            $table->time('clock_out');
            $table->time('break_start')->nullable();
            $table->time('break_end')->nullable();

            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraint
            $table->foreign('ck_settings_id')->references('id')->on('check_clock_settings')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_clock_setting_times');
    }
};
