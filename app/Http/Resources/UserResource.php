<?php

namespace App\Http\Resources;

use App\Enums\Contracts\Status;
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
            'avatar' => $this->avatar,
            'mobile' => $this->mobile,
            'timezone' => $this->timezone,
            'role' => $this->role->trans(),
            'status' => $this->status($this->status),
            'created_at' => $this->created_at,
        ];
    }

    protected function status(Status $status): array
    {
        return [
            'value' => $status->trans(),
            'color' => $status->color(),
        ];
    }
}
