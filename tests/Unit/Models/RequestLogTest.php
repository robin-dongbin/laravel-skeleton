<?php

declare(strict_types=1);

use App\Models\RequestLog;

test('to array', function () {
    $requestLog = RequestLog::factory()->create()->fresh();

    expect(array_keys($requestLog->toArray()))
        ->toBe([
            'id',
            'uuid',
            'user_id',
            'ip_address',
            'method',
            'path',
            'headers',
            'payload',
            'response_status',
            'response_headers',
            'response',
            'duration',
            'memory',
            'created_at',
            'updated_at',
        ]);
});
