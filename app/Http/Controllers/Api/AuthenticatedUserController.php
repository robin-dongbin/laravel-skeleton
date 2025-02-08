<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UpdateAuthenticatedUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class AuthenticatedUserController
{
    public function show(Request $request)
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
