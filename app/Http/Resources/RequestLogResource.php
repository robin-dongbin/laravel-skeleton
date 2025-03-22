<?php

namespace App\Http\Resources;

use App\Models\RequestLog;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin RequestLog */
class RequestLogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client_request_id' => $this->client_request_id,
            'ip' => $this->ip,
            'method' => $this->method,
            'path' => $this->path,
            'headers' => $this->headers,
            'payload' => $this->payload,
            'response' => $this->response,
            'duration' => $this->duration,
            'memory' => $this->memory,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
