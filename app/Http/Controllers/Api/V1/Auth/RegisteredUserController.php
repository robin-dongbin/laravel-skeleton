<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController
{
    /**
     * @unauthenticated
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'nickname' => ['required', 'string', 'max:255', Rule::unique(User::class)],
            'password' => ['required', 'confirmed', Password::default()],
        ]);

        $user = new User;
        $user->fill($validated);
        $user->password = Hash::make($request->password);
        $user->save();

        return UserResource::make($user);
    }
}
