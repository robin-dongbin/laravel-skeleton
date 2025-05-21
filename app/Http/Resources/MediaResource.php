<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Number;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @mixin Media
 */
class MediaResource extends Resource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'extension' => $this->extension,
            'mime_type' => $this->mime_type,
            'size' => Number::fileSize($this->size),
            'url' => $this->getUrl(),
            'created_at' => $this->created_at,
        ];
    }
}
