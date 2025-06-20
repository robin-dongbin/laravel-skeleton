<?php

namespace App\Models;

use App\Enums\IpStatus;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;

class Ip extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'status' => IpStatus::class,
            'location' => AsArrayObject::class,
        ];
    }

    public function authenticationLogs(): HasMany
    {
        return $this->hasMany(AuthenticationLog::class, 'ip_address', 'address');
    }

    public function requestLogs(): HasMany
    {
        return $this->hasMany(RequestLog::class, 'ip_address', 'address');
    }

    public static function privilegedIps()
    {
        return Cache::remember('privileged_ips', 60, function () {
            return Ip::where('status', IpStatus::Privileged)->pluck('address');
        });
    }
}
