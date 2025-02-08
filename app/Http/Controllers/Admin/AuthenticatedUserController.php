<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UpdateAuthenticatedUserRequest;
use App\Http\Resources\UserResource;

class AuthenticatedUserController
{
    public function show()
    {
        $user = auth()->user();

        return UserResource::make($user);
    }

    public function update(UpdateAuthenticatedUserRequest $request)
    {
        $user = auth()->user();
        $user->update($request->validated());

        return UserResource::make($user);
    }
}
