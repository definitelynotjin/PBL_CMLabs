<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('absence_requests', function (Blueprint $table) {
            $table->dropColumn('absence_date');
            $table->date('start_date');
            $table->date('end_date');
        });
    }

    public function down()
    {
        Schema::table('absence_requests', function (Blueprint $table) {
            $table->date('absence_date');
            $table->dropColumn(['start_date', 'end_date']);
        });
    }
};
