<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use App\Models\Concerns\HasRole;
use App\Models\Filters\UsernameFilter;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Lacodix\LaravelModelFilter\Traits\HasFilters;
use Lacodix\LaravelModelFilter\Traits\IsSearchable;
use Lacodix\LaravelModelFilter\Traits\IsSortable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasFilters, HasRole, IsSearchable, IsSortable, Notifiable,SoftDeletes;

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected array $searchable = [
        'id',
        'username',
        'nickname',
    ];

    protected array $sortable = [
        'id',
        'created_at',
    ];

    protected array $filters = [
        UsernameFilter::class,
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
            'metadata' => 'json',
            'role' => UserRole::class,
        ];
    }

    public function timezone(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ?? config('app.timezone_display')
        )->shouldCache();
    }
}
