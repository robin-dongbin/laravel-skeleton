<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('request_logs', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->ipAddress()->nullable();
            $table->string('method', 6)->nullable();
            $table->text('path')->nullable();
            $table->json('headers')->nullable();
            $table->json('payload')->nullable();
            $table->smallInteger('response_status')->nullable();
            $table->json('response_headers')->nullable();
            $table->longText('response')->nullable();
            $table->integer('duration')->nullable(); // ms
            $table->bigInteger('memory')->nullable(); // byte
            $table->timestampsTz();

            $table->index('user_id');
        });
    }
};
