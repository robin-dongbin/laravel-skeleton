<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\Concerns\HasRole;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasRole, Notifiable, SoftDeletes;

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function receivesBroadcastNotificationsOn(): string
    {
        return 'users.'.$this->id;
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'metadata' => 'array',
            'role' => UserRole::class,
            'status' => UserStatus::class,
        ];
    }

    public function timezone(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ?? config('app.timezone_display')
        )->shouldCache();
    }

    public function scopeStatus(Builder $query, $status): Builder
    {
        return match ($status) {
            'active' => $query->where('status', UserStatus::Approved)->orWhere('status', UserStatus::Pending),
            'banned' => $query->where('status', UserStatus::Banned),
            'all' => $query,
        };
    }
}
