<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('check_clocks', function (Blueprint $table) {
            $table->string('status')->default('Waiting Approval');
        });
    }

    public function down()
    {
        Schema::table('check_clocks', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
