<?php

use App\Models\User;

test('guests is unauthorized', function () {
    $response = $this->getJson(route('admin.users.index'));

    $response->assertUnauthorized();
});

test('members is forbidden', function () {
    $this->actingAsMember();

    $response = $this->getJson(route('admin.users.index'));

    $response->assertForbidden();
});

test('returns a successful response', function () {
    $this->actingAsAdmin();

    $model = User::factory()->create();

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
