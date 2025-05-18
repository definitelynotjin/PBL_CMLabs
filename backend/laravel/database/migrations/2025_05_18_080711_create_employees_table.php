<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // Optional: disable constraints temporarily (for safety in some edge cases)
        Schema::disableForeignKeyConstraints();

        Schema::dropIfExists('employees');

        Schema::enableForeignKeyConstraints();
    }
};
