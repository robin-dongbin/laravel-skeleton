<?php

namespace App\Actions;

use App\Models\AuthenticationLog;
use App\Models\User;
use Illuminate\Http\Request;

class CreateAuthenticatedLogAction
{
    public function __construct(public Request $request) {}

    public function handle(User $user, bool $successful = false): AuthenticationLog
    {
        return $user->authentications()
            ->create([
                'ip_address' => $this->request->ip(),
                'user_agent' => $this->request->userAgent(),
                'successful' => $successful,
            ]);
    }
}
