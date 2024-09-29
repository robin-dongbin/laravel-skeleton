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
}
