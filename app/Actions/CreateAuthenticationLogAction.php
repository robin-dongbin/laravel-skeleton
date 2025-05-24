<?php

namespace App\Actions;

use App\Models\AuthenticationLog;
use App\Models\User;

class CreateAuthenticationLogAction
{
    public function handle(User $user, array $data): AuthenticationLog
    {
        return $user->authentications()
            ->create([
                'ip_address' => $data['ip_address'],
                'user_agent' => $data['user_agent'],
                'successful' => $data['successful'],
            ]);
    }
}
