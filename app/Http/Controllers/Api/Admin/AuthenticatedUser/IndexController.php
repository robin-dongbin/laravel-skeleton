<?php

namespace App\Http\Controllers\Api\Admin\AuthenticatedUser;

use App\Http\Requests\AuthenticatedUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class IndexController
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
