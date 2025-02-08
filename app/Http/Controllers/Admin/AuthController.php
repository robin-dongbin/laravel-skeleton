<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Dedoc\Scramble\Attributes\Group;

#[Group('Auth')]
class AuthController
{
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = auth()->user();
        $token = $user->createToken('login')->plainTextToken;

        return UserResource::make($request->user())
            ->additional(['meta' => ['token' => $token]]);
    }

    public function logout()
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();

        return response()->noContent();
    }
}
