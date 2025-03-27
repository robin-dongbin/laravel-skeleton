<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\UserResource;
use Dedoc\Scramble\Attributes\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

#[Group('AuthenticatedUser')]
class AuthenticatedUserPasswordController
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user = $request->user();
        $user->password = Hash::make($validated['password']);
        $user->save();

        return UserResource::make($user);
    }
}
