<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\AuthenticatedUserRequest;
use App\Http\Resources\Admin\UserResource;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\Request;

#[Group('AuthenticatedUser')]
class AuthenticatedUserController
{
    public function show(Request $request)
    {
        $user = $request->user();

        return UserResource::make($user);
    }

    public function update(AuthenticatedUserRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());

        return UserResource::make($user);
    }
}
