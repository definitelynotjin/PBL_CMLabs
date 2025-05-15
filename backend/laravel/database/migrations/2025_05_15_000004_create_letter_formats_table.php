<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('letter_formats', function (Blueprint $table) {
            $table->string("id", 36)->primary();
               $table->string("name", 100);
               $table->text("content");
               $table->integer("status");
               $table->timestamps();
               $table->string("deleted_at", 30)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('letter_formats');
    }
};