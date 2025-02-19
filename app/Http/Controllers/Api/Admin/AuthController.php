<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;

class AuthController
{
    /**
     * @unauthenticated
     */
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = auth()->user();
        $token = $user->createToken('admin')->plainTextToken;

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
