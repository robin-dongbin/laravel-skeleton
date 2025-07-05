<?php

use App\Models\User;

test('guests is unauthorized', function () {
    $model = User::factory()->create();

    $response = $this->putJson(route('admin.users.update', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $model = User::factory()->create();

    $response = $this->putJson(route('admin.users.update', $model));

    $response->assertUnauthorized();
});

test('username is required', function () {
    $this->actingAsAdmin();

    $model = User::factory()->create();
    $new = User::factory()->make(['username' => null]);

    $response = $this->putJson(route('admin.users.update', $model), $new->toArray());

    $response->assertUnprocessable();
    $response->assertJsonValidationErrorFor('username');
});

test('nickname is required', function () {
    $this->actingAsAdmin();

    $model = User::factory()->create();
    $new = User::factory()->make(['nickname' => null]);

    $response = $this->putJson(route('admin.users.update', $model), $new->toArray());

    $response->assertUnprocessable();
    $response->assertJsonValidationErrorFor('nickname');
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = User::factory()->create();
    $new = User::factory()->make();

    $response = $this->putJson(route('admin.users.update', $model),
        array_merge($new->toArray(), ['password' => 'password']));

    $response->assertOk();
    $response->assertJsonStructure([
        'data' => [
            'username',
            'nickname',
            'mobile',
            'role',
            'status',
        ],
    ]);

    $this->assertModelExists($model);
    $this->assertDatabaseHas($model->getTable(), $new->toArray());
});
