<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class RoleResource extends Resource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => __($this->name),
        ];
    }
}
