<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class RegisteredUserController
{
    /**
     * @unauthenticated
     */
    public function store(Request $request)
    {
        $user = new User;
        $user->fill($request->validated());
        $user->save();

        return UserResource::make($user);
    }
}
