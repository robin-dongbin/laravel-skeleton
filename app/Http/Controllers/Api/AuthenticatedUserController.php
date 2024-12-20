<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedUserController
{
    /**
     * Fetch the authenticated User
     *
     * @return UserResource
     */
    public function show(Request $request)
    {
        $user = Auth::user();

        return UserResource::make($user);
    }

    /**
     * Update the authenticated User
     *
     * @return UserResource
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        $user->update($request->validated());

        return UserResource::make($user);
    }
}
