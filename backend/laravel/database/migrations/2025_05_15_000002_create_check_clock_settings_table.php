<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('check_clock_settings', function (Blueprint $table) {
            $table->string("id", 36)->primary();
               $table->string("name", 50);
               $table->integer("type");
               $table->timestamps();
               $table->string("deleted_at", 30)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('check_clock_settings');
    }
};