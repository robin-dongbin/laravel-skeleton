<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Spatie\Navigation\Navigation;
use Spatie\Navigation\Section;

class NavigationServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->resolving(Navigation::class, function (Navigation $navigation): Navigation {
            return $navigation
                ->add('Dashboard', route('admin.dashboard'), fn (Section $section) => $section->attributes(['icon' => 'lucide:layout-dashboard']))
                ->add('Users', route('admin.users.index'), fn (Section $section) => $section->attributes(['icon' => 'lucide:users']));
        });
    }
}
