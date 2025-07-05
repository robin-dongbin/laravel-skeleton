<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\Admin\UserResource;
use App\Models\Ip;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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
        if (! $user->isAdmin()) {
            throw ValidationException::withMessages([
                'username' => __('auth.failed').'(r)',
            ]);
        }

        $ips = Ip::privilegedIps();
        if (! $ips->contains($request->ip())) {
            throw ValidationException::withMessages([
                'username' => __('auth.failed').'('.$request->ip().')',
            ]);
        }

        $token = $user->createToken('admin')->plainTextToken;

        return UserResource::make($request->user())
            ->additional(['token' => $token]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->noContent();
    }
}
