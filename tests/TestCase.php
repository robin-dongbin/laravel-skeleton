<?php

namespace Tests;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function actingAsMember(): TestCase
    {
        $user = User::factory()->create(['role' => UserRole::Member]);

        return test()->actingAs($user);
    }

    protected function actingAsAdmin(): TestCase
    {
        $user = User::factory()->create(['role' => UserRole::Admin]);

        return test()->actingAs($user);
    }
}
