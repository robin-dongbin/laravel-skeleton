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

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->create();

    $response = $this->getJson(route('admin.ips.show', $model));

    $response->assertOk();
    $response->assertJson([
        'data' => [
            'id' => $model->id,
            'address' => $model->address,
            'location' => $model->location,
            'status' => $model->status->name,
            'remark' => $model->remark,
        ],
    ]);
});
