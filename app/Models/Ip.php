<?php

namespace App\Models;

use App\Enums\IpStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Ip extends Model
{
    protected $casts = [
        'status' => IpStatus::class,
    ];

    //    public function user(): BelongsTo
    //    {
    //        return $this->belongsTo(User::class);
    //    }

    public function scopeStatus(Builder $query, $status): Builder
    {
        return match ($status) {
            'active' => $query->where('status', IpStatus::Active),
            'privileged' => $query->where('status', IpStatus::Privileged),
            'blocked' => $query->where('status', IpStatus::Blocked),
            'all' => $query,
        };
    }
}
