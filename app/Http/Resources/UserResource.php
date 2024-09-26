<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

/**
 * @mixin \App\Models\User;
 */
class UserResource extends Resource
{
    public function toArray(Request $request): array
    {
        return [
            'username' => $this->username,
            'nickname' => $this->nickname,
            'avatar' => $this->avatar,
        ];
    }
}
