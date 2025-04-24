<?php

namespace App\Casts;

use App\ValueObjects\Location;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Contracts\Database\Eloquent\SerializesCastableAttributes;
use Illuminate\Database\Eloquent\Model;
use InvalidArgumentException;

class AsLocation implements CastsAttributes, SerializesCastableAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(
        Model $model,
        string $key,
        mixed $value,
        array $attributes,
    ): Location {
        return new Location(
            country_code: $attributes['country_code'],
            timezone: $attributes['timezone'],
            continent: $attributes['continent'],
            region: $attributes['region'],
            city: $attributes['city']
        );
    }

    public function serialize(Model $model, string $key, mixed $value, array $attributes): string
    {
        return (string) $value;
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     * @return array<string, string>
     */
    public function set(
        Model $model,
        string $key,
        mixed $value,
        array $attributes,
    ): array {
        if (! $value instanceof Location) {
            throw new InvalidArgumentException('The given value is not an Location instance.');
        }

        return [
            'country_code' => $value->country_code,
            'timezone' => $value->timezone,
            'continent' => $value->continent,
            'region' => $value->region,
            'city' => $value->city,
        ];
    }
}
