<?php

use App\Models\AuthenticationLog;

test('guests is unauthorized', function () {
    $response = $this->getJson(route('admin.authentication-logs.index'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->getJson(route('admin.authentication-logs.index'));

    $response->assertUnauthorized();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = AuthenticationLog::factory()->create();

    $response = $this->getJson(route('admin.authentication-logs.index'));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            [
                'id',
                'ip_address',
                'user_agent',
                'successful',
                'created_at',
            ],
        ],
    ]);
});
