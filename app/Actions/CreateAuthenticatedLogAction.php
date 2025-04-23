<?php

namespace App\Actions;

use App\Models\AuthenticationLog;
use App\Models\User;
use Illuminate\Http\Request;

class CreateAuthenticatedLogAction
{
    public function __construct(public CreateIpAction $createIpAction, public Request $request) {}

    public function handle(User $user, bool $successful = false): AuthenticationLog
    {
        $log = $user->authentications()
            ->create([
                'ip_address' => $this->request->ip(),
                'user_agent' => $this->request->userAgent(),
                'successful' => $successful,
            ]);

        defer(fn () => $this->createIpAction->handle([
            'address' => $this->request->ip(),
            'location' => [
                'country_code' => $this->request->header('cf-ipcountry'),
                'timezone' => $this->request->header('cf-timezone'),
                'continent' => $this->request->header('cf-ipcontinent'),
                'city' => $this->request->header('cf-ipcity'),
                'region' => $this->request->header('cf-region'),
            ],
        ]));

        return $log;
    }
}
