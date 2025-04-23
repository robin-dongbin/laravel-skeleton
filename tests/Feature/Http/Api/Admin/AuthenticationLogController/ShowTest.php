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

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = AuthenticationLog::factory()->create();

    $response = $this->getJson(route('admin.authentication-logs.show', $model));

    $response->assertOk();
    $response->assertJson([
        'data' => [
            'id' => $model->id,
            'ip_address' => $model->ip_address,
            'user_agent' => $model->user_agent,
            'successful' => $model->successful,
            'created_at' => $model->created_at->toISOString(),
        ],
    ]);
});
