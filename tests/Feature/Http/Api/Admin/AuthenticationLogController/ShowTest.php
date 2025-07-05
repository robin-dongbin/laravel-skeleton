<?php

use App\Models\AuthenticationLog;

test('guests is unauthorized', function () {
    $model = AuthenticationLog::factory()->create();

    $response = $this->getJson(route('admin.authentication-logs.show', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $model = AuthenticationLog::factory()->create();

    $response = $this->getJson(route('admin.authentication-logs.show', $model));

    $response->assertUnauthorized();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = AuthenticationLog::factory()->create();

    $response = $this->getJson(route('admin.authentication-logs.show', $model));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            'id',
            'ip_address',
            'user_agent',
            'successful',
            'created_at',
        ],
    ]);
});
