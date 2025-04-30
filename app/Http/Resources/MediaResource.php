<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Plank\Mediable\Media;

/**
 * @mixin Media
 */
class MediaResource extends Resource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at,
        ];
    }
}
