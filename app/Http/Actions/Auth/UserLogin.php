<?php

namespace App\Http\Actions\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;

class UserLogin
{
    public function __invoke(LoginRequest $request)
    {
        $request->authenticate();

        $token = $request->user()->createToken('login')->plainTextToken;

        return UserResource::make($request->user())
            ->additional(['meta' => ['token' => $token]]);
    }
}
