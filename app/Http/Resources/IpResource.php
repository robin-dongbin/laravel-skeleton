<?php

namespace App\Http\Resources;

use App\Models\Ip;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Ip */
class IpResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'address' => $this->address,
            'location' => $this->location,
            'status' => $this->status->trans(),
            'remark' => $this->remark,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            //            'user' => UserResource::make($this->whenLoaded('user')),
        ];
    }
}
