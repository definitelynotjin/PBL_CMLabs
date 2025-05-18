<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
// This migration adds timestamps and soft delete columns to the users and employees tables
// It checks if the columns already exist before adding them
// It also provides a down method to remove the columns if needed

class AddTimestampsAndSoftDeletesToUsersAndEmployees extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Only modify the users table, don't recreate it
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'created_at')) {
                $table->timestamps();
            }
            if (!Schema::hasColumn('users', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        Schema::table('employees', function (Blueprint $table) {
            if (!Schema::hasColumn('employees', 'created_at')) {
                $table->timestamps();
            }
            if (!Schema::hasColumn('employees', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropTimestamps();
            $table->dropSoftDeletes();
        });

        Schema::table('employees', function (Blueprint $table) {
            $table->dropTimestamps();
            $table->dropSoftDeletes();
        });
    }
}
