<?php

namespace Database\Factories;

use App\Models\RequestLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            'memory' => fake()->numberBetween(1000000000, 4000000000),
            'ip_address' => fake()->ipv4(),
            'user_id' => User::factory(),
        ];
    }
}
