<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Use UUID for consistency with users
            $table->uuid('user_id')->unique()->constrained('users')->onDelete('cascade'); // Match UUID type
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->enum('gender', ['M', 'F', 'O'])->nullable();
            $table->text('address');
            $table->timestamps();
            $table->softDeletes(); // Add soft deletes as per project
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropForeign(['user_id']); // Drop the foreign key constraint
        });
        Schema::dropIfExists('employees'); // Drop the table
    }
};
