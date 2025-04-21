<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfNotInstalled
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->alreadyInstalled() && ! $request->is('install')) {
            return redirect()->route('install');
        }

        return $next($request);
    }

    public function alreadyInstalled(): bool
    {
        return (bool) User::find(1);
    }
}
