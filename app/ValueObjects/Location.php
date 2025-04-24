<?php

namespace App\ValueObjects;

use App\Traits\Makeable;
use Illuminate\Contracts\Support\Arrayable;
use JsonSerializable;

class Location implements Arrayable, JsonSerializable
{
    use Makeable;

    public function __construct(
        public ?string $country_code,
        public ?string $timezone,
        public ?string $continent,
        public ?string $region,
        public ?string $city,
    ) {}

    public function toArray(): array
    {
        return [
            'country_code' => $this->country_code,
            'timezone' => $this->timezone,
            'continent' => $this->continent,
            'region' => $this->region,
            'city' => $this->city,
        ];
    }

    public function jsonSerialize(): array
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
