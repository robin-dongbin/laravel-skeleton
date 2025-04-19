<?php

namespace Database\Factories;

use App\Enums\IpStatus;
use App\Models\Ip;
use Illuminate\Database\Eloquent\Factories\Factory;

class IpFactory extends Factory
{
    protected $model = Ip::class;

    public function definition(): array
    {
        return [
            'address' => fake()->ipv4(),
            'status' => IpStatus::Active,
            'remark' => fake()->sentence(),
        ];
    }
}
