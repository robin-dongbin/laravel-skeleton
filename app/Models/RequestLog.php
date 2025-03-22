<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\MassPrunable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestLog extends Model
{
    use HasUuids, MassPrunable;

    protected function casts(): array
    {
        return [
            'headers' => 'json',
            'payload' => 'json',
            'response' => 'json',
        ];
    }

    public function prunable(): RequestLog|Builder
    {
        return static::where('created_at', '<=', now()->subDays(7));
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
