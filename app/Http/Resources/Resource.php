<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Resource extends JsonResource
{
    protected static function newCollection($resource): AnonymousResourceCollection
    {
        return new AnonymousResourceCollection($resource, static::class);
    }
}
