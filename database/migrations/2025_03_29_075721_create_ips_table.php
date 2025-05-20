<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ips', function (Blueprint $table) {
            $table->id();
            $table->ipAddress('address')->unique();
            $table->json('location')->nullable();
            $table->tinyInteger('status');
            $table->string('remark')->nullable();
            $table->timestamps();
        });
    }
};
