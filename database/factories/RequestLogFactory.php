<?php

namespace Database\Factories;

use App\Models\RequestLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RequestLogFactory extends Factory
{
    protected $model = RequestLog::class;

    public function definition(): array
    {
        return [
            'uuid' => fake()->uuid(),
            'method' => 'GET',
            'path' => fake()->word(),
            'headers' => fake()->words(),
            'payload' => fake()->words(),
            'response_status' => fake()->randomNumber(),
            'response_headers' => fake()->words(),
            'response' => fake()->words(),
            'duration' => fake()->randomNumber(),
            'memory' => fake()->randomNumber(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'user_id' => User::factory(),
            'ip_address' => fake()->ipv4(),
        ];
    }
}
