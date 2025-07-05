<?php

use App\Models\RequestLog;

test('guests is unauthorized', function () {
    $model = RequestLog::factory()->create();

    $response = $this->getJson(route('admin.request-logs.show', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $model = RequestLog::factory()->create();

    $response = $this->getJson(route('admin.request-logs.show', $model));

    $response->assertUnauthorized();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = RequestLog::factory()->create();

    $response = $this->getJson(route('admin.request-logs.show', $model));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            'id',
            'uuid',
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
        ],
    ]);
});
