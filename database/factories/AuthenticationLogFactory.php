<?php

namespace Database\Factories;

use App\Models\AuthenticationLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuthenticationLogFactory extends Factory
{
    protected $model = AuthenticationLog::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
            'successful' => fake()->boolean(),
        ];
    }
}
