<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class AuthController
{
    /**
     * @unauthenticated
     */
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = Auth::user();
        $token = $user->createToken('login')->plainTextToken;

        return UserResource::make($request->user())
            ->additional(['meta' => ['token' => $token]]);
    }
}
