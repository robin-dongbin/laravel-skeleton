<?php

use App\Models\Ip;

test('guests is unauthorized', function () {
    $model = Ip::factory()->create();

    $response = $this->putJson(route('admin.ips.update', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $model = Ip::factory()->create();

    $response = $this->putJson(route('admin.ips.update', $model));

    $response->assertForbidden();
});

test('address is required', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->create();
    $new = Ip::factory()->make(['address' => null]);

    $response = $this->putJson(route('admin.ips.update', $model), $new->toArray());

    $response->assertUnprocessable();
    $response->assertJsonValidationErrorFor('address');
});

test('status is required', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->create();
    $new = Ip::factory()->make(['status' => null]);

    $response = $this->putJson(route('admin.ips.update', $model), $new->toArray());

    $response->assertUnprocessable();
    $response->assertJsonValidationErrorFor('status');
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->create();
    $new = Ip::factory()->make();

    $response = $this->putJson(route('admin.ips.update', $model), $new->toArray());

    $response->assertOk();
    $response->assertJson([
        'data' => [
            'id' => $model->id,
            'address' => $new->address,
            'location' => $new->location,
            'status' => $new->status->name,
            'remark' => $new->remark,
        ],
    ]);

    $this->assertModelExists($model);
    $this->assertDatabaseHas($model->getTable(), $new->toArray());
});
