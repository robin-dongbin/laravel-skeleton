<?php

namespace App\Providers;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationItem;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Support\Enums\MaxWidth;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class FilamentServiceProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('filament')
            ->path('filament')
            ->login()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                AccountWidget::class,
                FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->maxContentWidth(MaxWidth::Full)
            ->spa()
            ->navigationItems([
                NavigationItem::make('Telescope')
                    ->url(url(config('telescope.path')), shouldOpenInNewTab: true)
                    ->icon('heroicon-o-sparkles')
                    ->group('Dev Tools'),
                NavigationItem::make('Horizon')
                    ->url(url(config('horizon.path')), shouldOpenInNewTab: true)
                    ->icon('heroicon-o-globe-europe-africa')
                    ->group('Dev Tools'),
                NavigationItem::make('Pulse')
                    ->url(url(config('pulse.path')), shouldOpenInNewTab: true)
                    ->icon('heroicon-o-bolt')
                    ->group('Dev Tools'),
                NavigationItem::make('Log Viewer')
                    ->url(url(config('log-viewer.route_path')), shouldOpenInNewTab: true)
                    ->icon('heroicon-o-document-text')
                    ->group('Dev Tools'),
            ])
            ->plugins([

            ]);
    }
}
