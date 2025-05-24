<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\Resource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            'role_display' => $this->role->trans(),
            'status' => $this->status,
            'status_display' => Str::lower($this->status->name),
            'created_at' => $this->created_at,
        ];
    }
}
