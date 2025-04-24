<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class LocationResource extends Resource
{
    public function toArray(Request $request): array
    {
        return [
            'country_code' => $this->country_code,
            'timezone' => $this->timezone,
            'continent' => $this->continent,
            'region' => $this->region,
            'city' => $this->city,
        ];
    }
}
