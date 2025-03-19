<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController
{
    /**
     * @unauthenticated
     */
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = $request->user();
        $token = $user->createToken('api')->plainTextToken;

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
        $user->password = Hash::make($request->password);
        $user->save();

        return UserResource::make($user);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->noContent();
    }
}
