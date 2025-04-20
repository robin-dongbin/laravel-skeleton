<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuthenticationLog extends Model
{
    protected $casts = [
        'successful' => 'boolean',
    ];

    public function prunable(): static|Builder
    {
        return static::where('created_at', '<=', now()->subDays(7));
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
