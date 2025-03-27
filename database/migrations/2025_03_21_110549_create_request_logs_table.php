<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('request_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('client_request_id')->nullable();
            $table->foreignId('user_id')->nullable()->constrained();
            $table->ipAddress('ip')->nullable();
            $table->string('method', 6)->nullable();
            $table->text('path')->nullable();
            $table->json('headers')->nullable();
            $table->json('payload')->nullable();
            $table->unsignedSmallInteger('response_status')->nullable();
            $table->json('response_headers')->nullable();
            $table->longText('response')->nullable();
            $table->unsignedMediumInteger('duration')->nullable(); // ms
            $table->unsignedMediumInteger('memory')->nullable(); // byte
            $table->timestamps();

            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('request_logs');
    }
};
