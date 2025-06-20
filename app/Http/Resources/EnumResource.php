<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnumResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->resource['name'],
            /** @var array<int, array{key:string, label: string, value: string,color:string}> */
            'options' => $this->resource['options'],
        ];
    }
}
