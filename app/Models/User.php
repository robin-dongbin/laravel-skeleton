<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Overtrue\LaravelVersionable\Versionable;
use Overtrue\LaravelVersionable\VersionStrategy;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Versionable;

    protected $versionable = ['nickname', 'phone_number', 'metadata'];

    protected $versionStrategy = VersionStrategy::SNAPSHOT;

    protected $fillable = [
        'name',
        'username',
        'nickname',
        'phone_number',
        'email',
        'metadata',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'metadata' => 'array',
        ];
    }
}
