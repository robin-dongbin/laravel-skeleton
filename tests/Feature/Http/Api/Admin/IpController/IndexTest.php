<?php

use App\Models\Ip;

test('guests is unauthorized', function () {
    $response = $this->getJson(route('admin.ips.index'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->getJson(route('admin.ips.index'));

    $response->assertUnauthorized();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->active()->create();

    $response = $this->getJson(route('admin.ips.index'));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            [
                'id',
                'address',
                'location',
                'status',
                'remark',
            ],
        ],
    ]);
});
