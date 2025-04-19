<?php

namespace App\Listeners;

use App\Actions\CreateAuthenticatedLogAction;
use App\Models\Concerns\AuthenticationLoggable;
use App\Models\User;
use Illuminate\Auth\Events\Failed;

class LoginFailedListener
{
    public function __construct(public CreateAuthenticatedLogAction $action) {}

    public function handle(Failed $event): void
    {
        /** @var User $user */
        $user = $event->user;

        if ($this->shouldLog($user)) {
            $this->action->handle($user);
        }

    }

    private function shouldLog(User $user): bool
    {
        return in_array(AuthenticationLoggable::class, class_uses_recursive(get_class($user)));
    }
}
