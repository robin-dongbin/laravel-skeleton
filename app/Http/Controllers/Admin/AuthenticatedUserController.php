<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UpdateAuthenticatedUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedUserController
{
    public function show(Request $request)
    {
        $user = Auth::user();

        return UserResource::make($user);
    }

    public function update(UpdateAuthenticatedUserRequest $request)
    {
        $user = Auth::user();
        $user->update($request->validated());

        return UserResource::make($user);
    }
}
