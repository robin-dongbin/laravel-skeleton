<?php

declare(strict_types=1);

use App\Models\AuthenticationLog;

test('to array', function () {
    $authenticationLog = AuthenticationLog::factory()->create()->fresh();

    expect(array_keys($authenticationLog->toArray()))
        ->toBe([
            'id',
            'user_id',
            'ip_address',
            'user_agent',
            'successful',
            'created_at',
            'updated_at',
        ]);
});
