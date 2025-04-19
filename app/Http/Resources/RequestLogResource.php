<?php

namespace App\Http\Resources;

use App\Models\RequestLog;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Number;

/** @mixin RequestLog */
class RequestLogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'ip_address' => $this->ip_address,
            'method' => $this->method,
            'path' => $this->path,
            'headers' => $this->headers,
            'payload' => $this->payload,
            'response_status' => $this->response_status,
            'response_headers' => $this->response_headers,
            'response' => $this->response,
            'duration' => $this->duration,
            'memory' => Number::fileSize($this->memory),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => UserResource::make($this->whenLoaded('user')),
            'ip' => IpResource::make($this->whenLoaded('ip')),
        ];
    }
}
