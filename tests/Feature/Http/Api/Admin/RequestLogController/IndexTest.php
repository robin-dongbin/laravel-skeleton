<?php

use App\Models\RequestLog;

test('guests is unauthorized', function () {
    $response = $this->getJson(route('admin.request-logs.index'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->getJson(route('admin.request-logs.index'));

    $response->assertUnauthorized();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = RequestLog::factory()->create();

    $response = $this->getJson(route('admin.request-logs.index'));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            [
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
        ],
    ]);
});
