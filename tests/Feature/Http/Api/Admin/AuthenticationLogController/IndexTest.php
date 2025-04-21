<?php

use App\Models\AuthenticationLog;

test('guests is unauthorized', function () {
    $response = $this->getJson(route('admin.authentication-logs.index'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->getJson(route('admin.authentication-logs.index'));

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = AuthenticationLog::factory()->create();

    $response = $this->getJson(route('admin.authentication-logs.index'));

    $response->assertOk();
    $response->assertJson([
        'data' => [
            [
                'id' => $model->id,
                'ip_address' => $model->ip_address,
                'user_agent' => $model->user_agent,
                'successful' => $model->successful,
                'created_at' => $model->created_at->toISOString(),
                'updated_at' => $model->updated_at->toISOString(),
            ],
        ],
    ]);
});
