<?php

use App\Models\User;

test('guests is unauthorized', function () {
    $model = User::factory()->create();

    $response = $this->deleteJson(route('admin.users.destroy', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $model = User::factory()->create();

    $response = $this->deleteJson(route('admin.users.destroy', $model));

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = User::factory()->create();

    $response = $this->deleteJson(route('admin.users.destroy', $model));

    $response->assertNoContent();

    $this->assertSoftDeleted($model);
});
