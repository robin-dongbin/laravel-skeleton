<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\Request;

#[Group('Auth')]
class AuthenticatedTokenController
{
    /**
     * @unauthenticated
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $user = $request->user();
        $token = $user->createToken('api')->plainTextToken;

        return UserResource::make($request->user())
            ->additional(['meta' => ['token' => $token]]);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->noContent();
    }
}
