<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class ProfileController
{
    public function show(Request $request)
    {
        $user = $request->user();

        return UserResource::make($user);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $user->update($request->validated());

        return UserResource::make($user);
    }
}
