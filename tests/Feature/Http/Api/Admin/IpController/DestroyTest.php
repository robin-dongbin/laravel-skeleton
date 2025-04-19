<?php

use App\Models\Ip;

test('guests is unauthorized', function () {
    $model = Ip::factory()->create();

    $response = $this->deleteJson(route('admin.ips.destroy', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $model = Ip::factory()->create();

    $response = $this->deleteJson(route('admin.ips.destroy', $model));

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = Ip::factory()->create();

    $response = $this->deleteJson(route('admin.ips.destroy', $model));

    $response->assertNoContent();

    $this->assertModelMissing($model);
});
