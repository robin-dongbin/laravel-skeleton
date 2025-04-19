<?php

namespace App\Models\Concerns;

use App\Models\AuthenticationLog;

trait AuthenticationLoggable
{
    public function authentications()
    {
        return $this->hasMany(AuthenticationLog::class)->latest('login_at');
    }

    public function latestAuthentication()
    {
        return $this->hasOne(AuthenticationLog::class)->latestOfMany('login_at');
    }

    public function lastLoginAt()
    {
        return $this->authentications()->first()?->login_at;
    }

    public function lastSuccessfulLoginAt()
    {
        return $this->authentications()->where('', true)->first()?->login_at;
    }

    public function lastLoginIp()
    {
        return $this->authentications()->first()?->ip_address;
    }

    public function lastSuccessfulLoginIp()
    {
        return $this->authentications()->whereLoginSuccessful(true)->first()?->ip_address;
    }

    public function previousLoginAt()
    {
        return $this->authentications()->skip(1)->first()?->login_at;
    }

    public function previousLoginIp()
    {
        return $this->authentications()->skip(1)->first()?->ip_address;
    }
}
