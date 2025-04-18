<?php

declare(strict_types=1);

use App\Models\User;

test('to array', function () {
    $user = User::factory()->create()->fresh();

    expect(array_keys($user->toArray()))
        ->toBe([
            'id',
            'name',
            'username',
            'nickname',
            'avatar',
            'role',
            'mobile',
            'mobile_verified_at',
            'email',
            'email_verified_at',
            'timezone',
            'status',
            'created_at',
            'updated_at',
            'deleted_at',
        ]);
});
