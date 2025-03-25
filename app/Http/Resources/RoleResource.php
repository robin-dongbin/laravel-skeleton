<?php

namespace App\Http\Resources;

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
