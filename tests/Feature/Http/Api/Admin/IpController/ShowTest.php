<?php

use App\Models\Ip;

test('guests is unauthorized', function () {
    $model = Ip::factory()->create();

    $response = $this->getJson(route('admin.ips.show', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $model = Ip::factory()->create();

    $response = $this->getJson(route('admin.ips.show', $model));

    $response->assertUnauthorized();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->create();

    $response = $this->getJson(route('admin.ips.show', $model));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            'id',
            'address',
            'location',
            'status',
            'remark',
        ],
    ]);
});
