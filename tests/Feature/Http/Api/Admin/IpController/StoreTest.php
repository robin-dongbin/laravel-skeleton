<?php

use App\Models\Ip;

test('guests is unauthorized', function () {
    $response = $this->postJson(route('admin.ips.store'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->postJson(route('admin.ips.store'));

    $response->assertUnauthorized();
});

test('address is required', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->make(['address' => null]);

    $response = $this->postJson(route('admin.ips.store'), $model->toArray());

    $response->assertUnprocessable();
    $response->assertJsonValidationErrorFor('address');
});

test('status is required', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->make(['status' => null]);

    $response = $this->postJson(route('admin.ips.store'), $model->toArray());

    $response->assertUnprocessable();
    $response->assertJsonValidationErrorFor('status');
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->make();

    $response = $this->postJson(route('admin.ips.store'), $model->toArray());

    $response->assertCreated();
    $response->assertJsonStructure([
        'data' => [
            'id',
            'address',
            'location',
            'status',
            'remark',
        ],
    ]);

    $this->assertDatabaseHas($model->getTable(), $model->toArray());
});
