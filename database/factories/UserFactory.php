<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => fake()->unique()->firstName(),
            'nickname' => fake()->unique()->firstName(),
            'mobile' => fake()->unique()->phoneNumber(),
            'role' => fake()->randomElement(UserRole::cases()),
            'password' => static::$password ??= Hash::make('password'),
            'status' => fake()->randomElement(UserStatus::cases()),
        ];
    }

    public function root(): static
    {
        return $this->set('parent_id', null);
    }

    public function superAdmin(): static
    {
        return $this->set('role', UserRole::SuperAdmin);
    }

    public function admin(): static
    {
        return $this->set('role', UserRole::Admin);
    }

    public function approved(): static
    {
        return $this->set('status', UserStatus::Approved);
    }
}
