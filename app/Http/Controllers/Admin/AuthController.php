<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Knuckles\Scribe\Attributes\Endpoint;
use Knuckles\Scribe\Attributes\Group;
use Knuckles\Scribe\Attributes\Response;
use Knuckles\Scribe\Attributes\ResponseFromApiResource;
use Knuckles\Scribe\Attributes\Unauthenticated;

#[Group('Auth')]
class AuthController
{
    #[Endpoint('Login')]
    #[Unauthenticated]
    #[ResponseFromApiResource(UserResource::class, User::class, additional: ['meta' => ['token' => '1|prdtrF5imrGPGZDdctVHxkB3M2dApfON1ghYhzuye8af1f31']])]
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = Auth::user();
        $token = $user->createToken('login')->plainTextToken;

        return UserResource::make($request->user())
            ->additional(['meta' => ['token' => $token]]);
    }

    #[Endpoint('Logout')]
    #[Response(status: 204)]
    public function logout()
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response()->noContent();
    }
}
