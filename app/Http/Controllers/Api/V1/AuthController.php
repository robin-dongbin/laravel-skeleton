<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

#[Group('Auth')]
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
            ->additional(['token' => $token]);
    }

    /**
     * @unauthenticated
     */
    public function register(RegisterRequest $request)
    {
        $user = new User;
        $user->fill($request->validated());
        $user->password = Hash::make($request->password);
        $user->role = UserRole::Member;
        $user->status = UserStatus::Pending;
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
