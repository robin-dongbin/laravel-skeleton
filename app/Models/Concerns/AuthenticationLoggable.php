<?php

namespace App\Models\Concerns;

use App\Models\AuthenticationLog;
use App\Models\Ip;

trait AuthenticationLoggable
{
    public function authentications()
    {
        return $this->hasMany(AuthenticationLog::class);
    }

    public function ips()
    {
        return $this->hasManyThrough(Ip::class, AuthenticationLog::class, 'ip_address', 'address');
    }

    public function latestAuthentication()
    {
        return $this->hasOne(AuthenticationLog::class)->latestOfMany();
    }

    public function lastLoginAt()
    {
        return $this->authentications()->latest()->first()?->created_at;
    }

    public function lastSuccessfulLoginAt()
    {
        return $this->authentications()->latest()->where('successful', true)->first()?->created_at;
    }

    public function lastLoginIp()
    {
        return $this->authentications()->latest()->first()?->ip_address;
    }

    public function lastSuccessfulLoginIp()
    {
        return $this->authentications()->latest()->where('successful', true)->first()?->ip_address;
    }

    public function previousLoginAt()
    {
        return $this->authentications()->latest()->skip(1)->first()?->created_at;
    }

    public function previousLoginIp()
    {
        return $this->authentications()->latest()->skip(1)->first()?->ip_address;
    }
}
