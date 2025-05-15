<?php

namespace App\Listeners;

use App\Actions\CreateRequestLogAction;
use Illuminate\Foundation\Http\Events\RequestHandled;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequestHandledListener
{
    public function __construct(public CreateRequestLogAction $action) {}

    public function handle(RequestHandled $event): void
    {
        if ($this->shouldLog($event->request, $event->response)) {
            $this->action->handle($event->request, $event->response);
        }
    }

    private function shouldLog(Request $request, Response $response): bool
    {
        $adminPrefix = config('app.route_prefix.admin');

        if (strtoupper($request->method() === 'OPTIONS')) {
            return false;
        }
        if ($request->is($adminPrefix.'/*', 'locales/*')) {
            return false;
        }

        return true;
    }
}
