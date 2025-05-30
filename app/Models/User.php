<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\Concerns\AuthenticationLoggable;
use App\Models\Concerns\HasRole;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class User extends Authenticatable implements FilamentUser, HasMedia
{
    use AuthenticationLoggable, HasApiTokens, HasFactory, HasRole, InteractsWithMedia, Notifiable, SoftDeletes;

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

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->id === 1;
    }

    public function timezone(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ?? config('app.timezone_display')
        )->shouldCache();
    }

    #[Scope]
    public function status(Builder $query, $value): Builder
    {
        return match ($value) {
            'active' => $query->where('status', UserStatus::Approved)->orWhere('status', UserStatus::Pending),
            'banned' => $query->where('status', UserStatus::Banned),
            'all' => $query,
        };
    }

    public function avatar(): MorphOne
    {
        return $this->morphOne(Media::class, 'model')
            ->where('collection_name', 'avatars')
            ->latestOfMany();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatars');
    }
}
