<?php

use App\Models\User;

test('guests is unauthorized', function () {
    $model = User::factory()->create();

    $response = $this->getJson(route('admin.users.show', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $model = User::factory()->create();

    $response = $this->getJson(route('admin.users.show', $model));

    $response->assertUnauthorized();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = User::factory()->create();

    $response = $this->getJson(route('admin.users.show', $model));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            'id',
            'username',
            'nickname',
            'mobile',
            'role',
            'status',
        ],
    ]);
});
