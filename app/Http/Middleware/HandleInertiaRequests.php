<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use MoonlyDays\InertiaRoutedModals\SharesRoutedModals;
use Spatie\Navigation\Navigation;

class HandleInertiaRequests extends Middleware
{
    use SharesRoutedModals;

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            ...$this->shareModal(),
            'app' => [
                'title' => config('app.title', '管理后台'),
            ],
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
            ],
            'navigation' => Navigation::make()->tree(),
        ];
    }
}
