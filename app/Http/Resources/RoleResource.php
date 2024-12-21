<?php

namespace App\Http\Resources;

use App\Models\Role;
use Illuminate\Http\Request;

/**
 * @mixin Role;
 */
class RoleResource extends Resource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name->translation(),
        ];
    }
}
