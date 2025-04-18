<?php

use App\Enums\UserRole;
use App\Models\User;

test('guests is unauthorized', function () {
    $model = User::factory()->create();
    $response = $this->getJson(route('admin.users.show', $model));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $user = User::factory()->create(['role' => UserRole::Member]);
    $this->actingAs($user);

    $model = User::factory()->create();
    $response = $this->getJson(route('admin.users.show', $model));

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $user = User::factory()->create(['role' => UserRole::Admin]);
    $this->actingAs($user);

    $model = User::factory()->create();
    $response = $this->getJson(route('admin.users.show', $model));

    $response->assertOk();
    $response->assertJson([
        'data' => [
            'id' => $model->id,
            'username' => $model->username,
            'nickname' => $model->nickname,
            'avatar' => $model->avatar,
            'mobile' => $model->mobile,
            'timezone' => $model->timezone,
            'role' => $model->role->trans(),
            'status' => $model->status->trans(),
        ],
    ]);
});
