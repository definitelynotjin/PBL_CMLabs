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
            $table->id();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('check_clocks', function (Blueprint $table) {
            $table->dropForeign(['user_id']); // Replace 'user_id' with the actual foreign key column name
        });

        Schema::dropIfExists('check_clocks'); // Drop the table
    }
};
