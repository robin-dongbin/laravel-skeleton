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

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = RequestLog::factory()->create();

    $response = $this->getJson(route('admin.request-logs.show', $model));

    $response->assertOk();
    $response->assertJson([
        'data' => [
            'id' => $model->id,
            'uuid' => $model->uuid,
            'ip_address' => $model->ip_address,
            'method' => $model->method,
            'path' => $model->path,
            'headers' => $model->headers,
            'payload' => $model->payload,
            'response_status' => $model->response_status,
            'response_headers' => $model->response_headers,
            'response' => $model->response,
            'duration' => $model->duration,
            'memory' => Number::fileSize($model->memory),
        ],
    ]);
});
