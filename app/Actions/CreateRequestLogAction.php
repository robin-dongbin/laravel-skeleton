<?php

namespace App\Actions;

use App\Models\RequestLog;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;

class CreateRequestLogAction
{
    public static array $hiddenResponseParameters = [
        'token',
        'meta.token',
    ];

    public static array $hiddenRequestHeaders = [
        'cookie',
        'apikey',
        'api_token',
        'Authorization',
        'authorization',
    ];

    public static array $hiddenRequestParameters = [
        'password',
        'password_confirm',
    ];

    public function handle(Request $request, Response $response): void
    {
        $startTime = defined('LARAVEL_START') ? LARAVEL_START : $request->server('REQUEST_TIME_FLOAT');
        $duration = $startTime ? floor((microtime(true) - $startTime) * 1000) : null;
        $memory = memory_get_peak_usage(true);

        $data = [
            'ip_address' => $request->ip(),
            'method' => $request->method(),
            'path' => $request->path(),
            'duration' => $duration,
            'memory' => $memory,
            'headers' => $this->headers($request->headers->all()),
            'payload' => $this->payload($this->input($request)),
            'response_status' => $response->getStatusCode(),
            'response_headers' => $this->headers($response->headers->all()),
            'response' => $this->response($response),
            'user_id' => $request->user() ? $request->user()->getKey() : null,
        ];

        RequestLog::create($data);
    }

    protected function input(Request $request): array
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

    protected function contentWithinLimits($content): bool
    {
        $limit = 64;

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
            if (is_array($data = json_decode($content, true)) && json_last_error() === JSON_ERROR_NONE) {
                return $this->contentWithinLimits($content)
                    ? $this->hideParameters($data, static::$hiddenResponseParameters)
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
