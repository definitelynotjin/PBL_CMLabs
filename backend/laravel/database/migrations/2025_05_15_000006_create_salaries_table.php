<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('salaries', function (Blueprint $table) {
            $table->string("id", 36)->primary();
               $table->string("user_id", 36);
               $table->integer("type");
               $table->float("rate");
               $table->date("effective_date");
               $table->timestamps();
               $table->string("deleted_at", 30)->nullable();
               $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};