<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class AuthController
{
    /**
     * @unauthenticated
     */
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = $request->user();
        $token = $user->createToken('admin')->plainTextToken;

        return UserResource::make($request->user())
            ->additional(['meta' => ['token' => $token]]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->noContent();
    }
}
