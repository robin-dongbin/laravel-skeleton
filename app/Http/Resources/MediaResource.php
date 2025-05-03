<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Number;
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
            'filename' => $this->filename,
            'extension' => $this->extension,
            'aggregate_type' => $this->aggregate_type,
            'size' => Number::fileSize($this->size),
            'alt' => $this->alt,
            'url' => $this->getUrl(),
            'created_at' => $this->created_at,
        ];
    }
}
