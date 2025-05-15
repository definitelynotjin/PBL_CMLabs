<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('check_clocks', function (Blueprint $table) {
            $table->string("id", 36)->primary();
               $table->string("user_id", 36);
               $table->integer("check_clock_type");
               $table->time("check_clock_time");
               $table->timestamps();
               $table->string("deleted_at", 30)->nullable();
               $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('check_clocks');
    }
};