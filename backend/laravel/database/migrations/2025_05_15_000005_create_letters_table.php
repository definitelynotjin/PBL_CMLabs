<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('letters', function (Blueprint $table) {
            $table->string("id", 36)->primary();
               $table->string("letter_format_id", 36);
               $table->string("user_id", 36);
               $table->string("name", 100);
               $table->timestamps();
               $table->string("deleted_at", 30)->nullable();
               $table->foreign("letter_format_id")->references("id")->on("letter_formats")->onDelete("cascade");
               $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('letters');
    }
};