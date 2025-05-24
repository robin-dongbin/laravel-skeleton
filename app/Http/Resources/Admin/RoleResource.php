<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\Resource;
use Illuminate\Http\Request;

class RoleResource extends Resource
{
    public function toArray(Request $request): array
    {
        return [
            'value' => $this->resource['value'],
            'label' => $this->resource['label'],
        ];
    }
}
