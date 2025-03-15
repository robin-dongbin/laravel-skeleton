<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\UpdateAuthenticatedUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class AuthenticatedUserController
{
    public function show(Request $request)
    {
        $user = $request->user();

        return UserResource::make($user);
    }

    public function update(UpdateAuthenticatedUserRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());

        return UserResource::make($user);
    }
}
