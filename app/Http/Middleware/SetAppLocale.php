<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetAppLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $lang = $request->query('lang', $request->header('Lang', 'en'));

        $locale = match ($lang) {
            'zh', 'zh-CN' => 'zh_CN',
            'en' => 'en',
            default => 'ko',
        };

        app()->setLocale($locale);

        return $next($request);
    }
}
