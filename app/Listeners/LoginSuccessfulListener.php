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
            $this->action->handle($user, true);
        }

    }

    private function shouldLog(User $user): bool
    {
        return in_array(AuthenticationLoggable::class, class_uses_recursive(get_class($user)));
    }
}
