<?php

use App\Models\User;

test('guests is unauthorized', function () {
    $response = $this->getJson(route('admin.users.index'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->getJson(route('admin.users.index'));

    $response->assertUnauthorized();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = User::factory()->approved()->create();

    $response = $this->getJson(route('admin.users.index'));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            [
                'id',
                'username',
                'nickname',
                'mobile',
                'role',
                'status',
            ],
        ],
    ]);
});
