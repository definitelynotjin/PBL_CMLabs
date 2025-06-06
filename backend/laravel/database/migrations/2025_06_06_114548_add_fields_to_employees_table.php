<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->string('nik')->unique();
            $table->string('pendidikan_terakhir', 50)->nullable();
            $table->string('tempat_lahir', 100)->nullable();
            $table->enum('contract_type', ['Tetap', 'Kontrak', 'Lepas'])->nullable();
            $table->string('grade', 50)->nullable();
            $table->string('bank', 50)->nullable();
            $table->string('nomor_rekening', 30)->nullable();
            $table->string('atas_nama_rekening', 100)->nullable();
            $table->enum('tipe_sp', ['SP 1', 'SP 2', 'SP 3'])->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn([
                'nik',
                'pendidikan_terakhir',
                'tempat_lahir',
                'contract_type',
                'grade',
                'bank',
                'nomor_rekening',
                'atas_nama_rekening',
                'tipe_sp',
            ]);
        });
    }
};
