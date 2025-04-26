<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\MassPrunable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestLog extends Model
{
    use HasFactory, HasUuids, MassPrunable;

    public function uniqueIds(): array
    {
        return ['uuid'];
    }

    protected function casts(): array
    {
        return [
            'headers' => 'array',
            'payload' => 'array',
            'response_headers' => 'array',
            'response' => 'array',
        ];
    }

    public function prunable(): static|Builder
    {
        return static::where('created_at', '<=', now()->subDays(7));
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function ip(): BelongsTo
    {
        return $this->belongsTo(Ip::class, 'ip_address', 'address');
    }
}
