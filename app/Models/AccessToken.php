<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\MassPrunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Sanctum\PersonalAccessToken;

class AccessToken extends PersonalAccessToken
{
    use MassPrunable;

    public function prunable(): static|Builder
    {
        return static::where('last_used_at', '<', now()->subHour());
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tokenable_id');
    }
}
