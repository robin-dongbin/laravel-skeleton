<?php

namespace App\Http\Resources;

use App\Models\Ip;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

/** @mixin Ip */
class IpResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'address' => $this->address,
            'status' => Str::lower($this->status->name),
            'remark' => $this->remark,
            'created_at' => $this->created_at,
            'location' => LocationResource::make($this->location),
            'request_logs' => RequestLogResource::collection($this->whenLoaded('requestLogs')),
            'authentication_logs' => AuthenticationLogResource::collection($this->whenLoaded('authenticationLogs')),
        ];
    }
}
