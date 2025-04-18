<?php

use App\Enums\UserRole;
use App\Models\User;

test('guests is unauthorized', function () {
    $response = $this->getJson(route('admin.users.index'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $user = User::factory()->create(['role' => UserRole::Member]);

    $this->actingAs($user);

    $response = $this->getJson(route('admin.users.index'));

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $user = User::factory()->create(['role' => UserRole::Admin]);

    $model = User::factory()->create();

    $this->actingAs($user);

    $response = $this->getJson(route('admin.users.index'));

    $response->assertOk();
    $response->assertJson([
        'data' => [
            [
                'id' => $model->id,
                'username' => $model->username,
                'nickname' => $model->nickname,
                'avatar' => $model->avatar,
                'mobile' => $model->mobile,
                'timezone' => $model->timezone,
                'role' => $model->role->trans(),
                'status' => $model->status->trans(),
            ],
        ],
    ]);
});
