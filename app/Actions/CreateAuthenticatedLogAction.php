<?php

namespace App\Actions;

use App\Models\AuthenticationLog;
use App\Models\User;

class CreateAuthenticatedLogAction
{
    public function __construct(public CreateIpAction $createIpAction) {}

    public function handle(User $user, bool $successful = false): AuthenticationLog
    {
        $ip = request()->ip();
        $ua = request()->userAgent();

        $log = $user->authentications()
            ->create([
                'ip_address' => $ip,
                'user_agent' => $ua,
                'successful' => $successful,
            ]);

        defer(fn () => $this->createIpAction
            ->handle([
                'address' => $ip,
            ]));

        return $log;
    }
}
