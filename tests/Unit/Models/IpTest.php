<?php

declare(strict_types=1);

use App\Models\Ip;

test('to array', function () {
    $user = Ip::factory()->create()->fresh();

    expect(array_keys($user->toArray()))
        ->toBe([
            'id',
            'address',
            'location',
            'status',
            'remark',
            'created_at',
            'updated_at',
        ]);
});
