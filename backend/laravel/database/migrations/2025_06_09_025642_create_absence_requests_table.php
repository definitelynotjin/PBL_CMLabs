<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('absence_requests', function (Blueprint $table) {
            $table->char('id', 36)->primary();
            $table->char('employee_id', 36);
            $table->date('absence_date');
            $table->enum('absence_type', ['annual_leave', 'sick', 'permission', 'other']);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('reason')->nullable();
            $table->string('file_path')->nullable(); // proof (e.g., letter, photo)
            $table->string('location_name')->nullable();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('absence_requests');
    }
};
