<?php

declare(strict_types=1);

use App\Models\User;

test('to array', function () {
    $user = User::factory()->create()->refresh();

    expect(array_keys($user->toArray()))
        ->toBe([
            'id',
            'name',
            'username',
            'nickname',
            'avatar',
            'phone_number',
            'phone_number_verified_at',
            'email',
            'email_verified_at',
            'timezone',
            'metadata',
            'created_at',
            'updated_at',
            'deleted_at',
        ]);
});
