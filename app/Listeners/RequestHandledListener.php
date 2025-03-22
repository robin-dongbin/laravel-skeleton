<?php

namespace App\Listeners;

use App\Models\RequestLog;
use Illuminate\Foundation\Http\Events\RequestHandled;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class RequestHandledListener
{
    public function handle(RequestHandled $event): void
    {
        $request = $event->request;
        $response = $event->response;

        $startTime = defined('LARAVEL_START') ? LARAVEL_START : $request->server('REQUEST_TIME_FLOAT');
        $duration = $startTime ? floor((microtime(true) - $startTime) * 1000) : null;
        $memory = memory_get_peak_usage(true);

        if ($this->shouldLog($request, $response)) {
            $model = new RequestLog;
            $model->ip = $request->ip();
            $model->method = $request->method();
            $model->path = $request->path();
            $model->duration = $duration;
            $model->memory = $memory;
            $model->headers = $this->mask($request->headers->all()) ?: null;
            $model->payload = $this->mask($request->input()) ?: null;
            $model->response = [
                'status_code' => $response->getStatusCode(),
                'headers' => $this->mask($request->headers->all()) ?: null,
                'body' => $response->getContent(),
            ];

            if ($user = $request->user()) {
                $model->user()->associate($user);
            }

            $model->save();
        }
    }

    private function shouldLog(Request $request, Response $response): bool
    {
        return $this->methodEnabled($request) && ! $this->pathIgnored($request);
    }

    private function methodEnabled(Request $request): bool
    {
        return in_array(strtoupper($request->method()), ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
    }

    private function pathIgnored(Request $request): bool
    {
        return $request->is(['broadcasting']);
    }

    private function mask(array $data): array
    {
        $keys = [
            'password',
            'password_confirm',
            'apikey',
            'api_token',
            'Authorization',
        ];

        return collect($data)->map(function ($value, $key) use ($keys) {
            $str = Str::of($key);
            if ($str->contains($keys)) {
                $str->mask('*', 3);
            }

            return $str;
        })->toArray();
    }
}
