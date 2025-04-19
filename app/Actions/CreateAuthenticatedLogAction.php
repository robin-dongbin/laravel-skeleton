<?php

namespace App\Actions;

use App\Models\User;

class CreateAuthenticatedLogAction
{
    public function __construct(public CreateIpAction $createIpAction) {}

    public function handle(User $user, bool $successful = false): void
    {
        $ip = request()->ip();
        $ua = request()->userAgent();

        $known = $user->authentications()->where('ip_address', $ip)
            ->where('user_agent', $ua)
            ->where('successful', true)
            ->first();

        $newUser = now()->diffInMinutes($user->created_at) < 1;

        $log = $user->authentications()->create([
            'ip_address' => $ip,
            'user_agent' => $ua,
            'successful' => $successful,
        ]);

        //        if (! $known && ! $newUser) {
        //            $user->notify();
        //        }

        defer(fn () => $this->createIpAction->handle([
            'address' => $ip,
        ]));
    }
}
