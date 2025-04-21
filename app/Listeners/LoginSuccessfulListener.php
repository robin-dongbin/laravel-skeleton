<?php

namespace App\Listeners;

use App\Actions\CreateAuthenticatedLogAction;
use App\Models\Concerns\AuthenticationLoggable;
use App\Models\User;
use Illuminate\Auth\Events\Authenticated;

class LoginSuccessfulListener
{
    public function __construct(public CreateAuthenticatedLogAction $action) {}

    public function handle(Authenticated $event): void
    {
        /** @var User $user */
        $user = $event->user;

        if ($this->shouldLog($user)) {
            $log = $this->action->handle($user, true);

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
