<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up()
{
    Schema::table('check_clocks', function (Blueprint $table) {
        $table->string('supporting_document_path')->nullable()->after('longitude');
    });
}

public function down()
{
    Schema::table('check_clocks', function (Blueprint $table) {
        $table->dropColumn('supporting_document_path');
    });
}

};
