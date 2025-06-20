<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\Resource;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * @mixin User
 */
class UserResource extends Resource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'nickname' => $this->nickname,
            'avatar' => MediaResource::make($this->avatar),
            'mobile' => $this->mobile,
            'timezone' => $this->timezone,
            'role' => $this->role,
            'status' => $this->status,
            'created_at' => $this->created_at,
        ];
    }
}
