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
            'status' => fake()->randomElement(IpStatus::cases()),
            'remark' => fake()->sentence(),
        ];
    }

    public function active(): static
    {
        return $this->set('status', IpStatus::Active);
    }

    public function privileged(): static
    {
        return $this->set('status', IpStatus::Privileged);
    }
}
