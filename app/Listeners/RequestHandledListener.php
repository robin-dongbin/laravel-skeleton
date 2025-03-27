<?php

namespace App\Listeners;

use App\Models\RequestLog;
use Illuminate\Foundation\Http\Events\RequestHandled;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class RequestHandledListener
{
    public static array $hiddenResponseParameters = [
        'token',
        'meta.token',
    ];

    public static array $hiddenRequestHeaders = [
        'apikey',
        'api_token',
        'Authorization',
        'authorization',
    ];

    public static array $hiddenRequestParameters = [
        'password',
        'password_confirm',
    ];

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
            $model->headers = $this->headers($request->headers->all());
            $model->payload = $this->payload($this->input($event->request));
            $model->response_status = $response->getStatusCode();
            $model->response_headers = $this->headers($response->headers->all());
            $model->response = $this->response($response);

            if ($user = $request->user()) {
                $model->user()->associate($user);
            }

            $model->save();
        }
    }

    private function shouldLog(Request $request, Response $response): bool
    {
        if ($request->is('api/*')) {
            return true;
        }
        if (in_array(strtoupper($request->method()), ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])) {
            return true;
        }

        return false;
    }

    private function input(Request $request): array
    {
        $files = $request->files->all();

        array_walk_recursive($files, function (&$file) {
            $file = [
                'name' => $file->getClientOriginalName(),
                'size' => $file->isFile() ? ($file->getSize() / 1000).'KB' : '0',
            ];
        });

        return array_replace_recursive($request->input(), $files);
    }

    public function contentWithinLimits($content): bool
    {
        $limit = $this->options['size_limit'] ?? 64;

        return intdiv(mb_strlen($content), 1000) <= $limit;
    }

    protected function hideParameters($data, $hidden)
    {
        foreach ($hidden as $parameter) {
            if (Arr::get($data, $parameter)) {
                Arr::set($data, $parameter, '********');
            }
        }

        return $data;
    }

    protected function headers($headers)
    {
        $headers = collect($headers)
            ->map(fn ($header) => implode(', ', $header))
            ->all();

        return $this->hideParameters($headers, static::$hiddenRequestHeaders);
    }

    protected function payload($payload)
    {
        return $this->hideParameters($payload, static::$hiddenRequestParameters);
    }

    protected function response(Response $response)
    {
        $content = $response->getContent();

        if (is_string($content)) {
            if (is_array(json_decode($content, true)) &&
                json_last_error() === JSON_ERROR_NONE) {
                return $this->contentWithinLimits($content)
                    ? $this->hideParameters(json_decode($content, true), static::$hiddenResponseParameters)
                    : 'Purged';
            }

            if (Str::startsWith(strtolower($response->headers->get('Content-Type') ?? ''), 'text/plain')) {
                return $this->contentWithinLimits($content) ? $content : 'Purged';
            }
        }

        if ($response instanceof RedirectResponse) {
            return 'Redirected to '.$response->getTargetUrl();
        }

        if (is_string($content) && empty($content)) {
            return 'Empty Response';
        }

        return 'HTML Response';
    }
}
