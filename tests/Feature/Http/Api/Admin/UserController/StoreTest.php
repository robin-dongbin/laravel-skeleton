<?php

use App\Models\User;

test('guests is unauthorized', function () {
    $response = $this->postJson(route('admin.users.store'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->postJson(route('admin.users.store'));

    $response->assertForbidden();
});

test('username is required', function () {
    $this->actingAsAdmin();

    $model = User::factory()->make(['username' => null]);

    $response = $this->postJson(route('admin.users.store'), $model->toArray());

    $response->assertUnprocessable();
    $response->assertJsonValidationErrorFor('username');
});

test('nickname is required', function () {
    $this->actingAsAdmin();

    $model = User::factory()->make(['nickname' => null]);

    $response = $this->postJson(route('admin.users.store'), $model->toArray());

    $response->assertUnprocessable();
    $response->assertJsonValidationErrorFor('nickname');
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = User::factory()->make();

    $response = $this->postJson(route('admin.users.store'), array_merge($model->toArray(), ['password' => 'password']));

    $response->assertCreated();
    $response->assertJson([
        'data' => [
            'username' => $model->username,
            'nickname' => $model->nickname,
            'avatar' => $model->avatar,
            'mobile' => $model->mobile,
            'timezone' => $model->timezone,
            'role' => $model->role->trans(),
            'status' => $model->status->trans(),
        ],
    ]);

    $this->assertDatabaseHas($model->getTable(), $model->toArray());
});
