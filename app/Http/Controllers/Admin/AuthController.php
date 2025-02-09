<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\LoginRequest;
use Dedoc\Scramble\Attributes\Group;

#[Group('Auth')]
class AuthController
{
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('admin.home', absolute: false));
    }

    public function logout()
    {
        $user = auth()->user();
        $user->currentAccessToken()->delete();

        return response()->noContent();
    }
}
