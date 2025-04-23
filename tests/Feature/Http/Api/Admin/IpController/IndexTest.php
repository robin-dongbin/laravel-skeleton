<?php

use App\Models\Ip;

test('guests is unauthorized', function () {
    $response = $this->getJson(route('admin.ips.index'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->getJson(route('admin.ips.index'));

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->create();

    $response = $this->getJson(route('admin.ips.index'));

    $response->assertOk();
    $response->assertJson([
        'data' => [
            [
                'id' => $model->id,
                'address' => $model->address,
                'location' => $model->location,
                'status' => $model->status->name,
                'remark' => $model->remark,
            ],
        ],
    ]);
});
