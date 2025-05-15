<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->string("id", 36)->primary();
               $table->string("user_id", 36);
               $table->string("ck_settings_id", 36);
               $table->string("first_name", 100);
               $table->string("last_name", 100);
               $table->char("gender", 1);
               $table->text("address")->nullable();
               $table->timestamps();
               $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
               $table->foreign("ck_settings_id")->references("id")->on("check_clock_settings")->onDelete("cascade");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};