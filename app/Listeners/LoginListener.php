<?php

namespace App\Listeners;

use App\Actions\CreateAuthenticatedLogAction;
use App\Actions\CreateIpAction;
use App\Models\Concerns\AuthenticationLoggable;
use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;

class LoginListener
{
    public function __construct(
        public CreateAuthenticatedLogAction $action,
        public CreateIpAction $createIpAction,
        public Request $request
    ) {}

    public function handle(Login $event): void
    {
        /** @var User $user */
        $user = $event->user;

        if (isset($user) && $this->shouldLog($user)) {
            $log = $this->action->handle($user, true);

            $this->createIpAction->handle([
                'address' => $this->request->ip(),
                'location' => [
                    'country_code' => $this->request->header('cf-ipcountry'),
                    'timezone' => $this->request->header('cf-timezone'),
                    'continent' => $this->request->header('cf-ipcontinent'),
                    'city' => $this->request->header('cf-ipcity'),
                    'region' => $this->request->header('cf-region'),
                ],
            ]);

            //            $known = $user->authentications()
            //                ->where('id', '<>', $log->id)
            //                ->where('ip_address', $log->ip_address)
            //                ->where('user_agent', $log->user_agent)
            //                ->where('successful', true)
            //                ->first();
            //
            //            $newUser = now()->diffInMinutes($user->created_at) < 1;
            //
            //            if (! $known && ! $newUser) {
            //                $user->notify();
            //            }
        }
    }

    private function shouldLog(User $user): bool
    {
        return in_array(AuthenticationLoggable::class, class_uses_recursive(get_class($user)));
    }
}
