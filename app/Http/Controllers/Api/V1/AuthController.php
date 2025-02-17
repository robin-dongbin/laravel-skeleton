<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class AuthController
{
    /**
     * @unauthenticated
     */
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = auth()->user();
        $token = $user->createToken('login')->plainTextToken;

        return UserResource::make($request->user())
            ->additional(['meta' => ['token' => $token]]);
    }

    /**
     * @unauthenticated
     */
    public function register(RegisterRequest $request)
    {
        $user = new User;
        $user->fill($request->validated());
        $user->save();

        return UserResource::make($user);
    }

    public function logout()
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();

        return response()->noContent();
    }
}
