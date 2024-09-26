<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->index()->nullable()->change();
            $table->string('email')->nullable()->change();
            $table->string('username')->unique();
            $table->string('nickname')->index();
            $table->string('avatar')->nullable();
            $table->string('phone_number')->unique()->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex('name');
            $table->string('email')->change();
            $table->dropColumn('username');
            $table->dropColumn('nickname');
            $table->dropColumn('avatar');
            $table->dropColumn('phone_number');
        });
    }
};
