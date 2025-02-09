<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\Route;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

/**
 * @mixin Carbon
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureCommands();
        $this->configureModels();
        $this->configureDates();

        Scramble::afterOpenApiGenerated(function (OpenApi $openApi): void {
            $openApi->secure(
                SecurityScheme::http('bearer')
            );
        });

        Scramble::registerApi('admin', ['api_path' => 'admin'])
            ->routes(fn (Route $route) => Str::startsWith($route->uri, 'admin/'))
            ->afterOpenApiGenerated(function (OpenApi $openApi): void {
                $openApi->secure(
                    SecurityScheme::http('bearer')
                );
            });

    }

    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands($this->app->isProduction());
    }

    private function configureModels(): void
    {
        Model::unguard();
        Model::shouldBeStrict();
    }

    private function configureDates(): void
    {
        Date::use(CarbonImmutable::class);
        Carbon::macro('inApplicationTimezone', fn (): Carbon => $this->setTimezone(config('app.timezone_display')));
        Carbon::macro('inUserTimezone', fn (): Carbon => $this->setTimezone(auth()->user()->timezone ?? config('app.timezone_display')));
        Vite::prefetch(concurrency: 3);
    }
}
