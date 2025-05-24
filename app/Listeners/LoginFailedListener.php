<?php

namespace App\Listeners;

use App\Actions\CreateAuthenticationLogAction;
use App\Models\Concerns\AuthenticationLoggable;
use App\Models\User;
use Illuminate\Auth\Events\Failed;
use Illuminate\Http\Request;

class LoginFailedListener
{
    public function __construct(public CreateAuthenticationLogAction $action, public Request $request) {}

    public function handle(Failed $event): void
    {
        /** @var User $user */
        $user = $event->user;

        if (isset($user) && $this->shouldLog($user)) {
            $log = $this->action->handle($user, [
                'ip_address' => $this->request->ip(),
                'user_agent' => $this->request->userAgent(),
                'successful' => false,
            ]);

            // $user->notify();
        }

    }

    private function shouldLog(User $user): bool
    {
        return in_array(AuthenticationLoggable::class, class_uses_recursive(get_class($user)));
    }
}
