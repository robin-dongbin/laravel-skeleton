<?php

namespace App\Providers;

use App\Models\User;
use Carbon\CarbonImmutable;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Auth\Access\Response;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
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
        $this->configureModels();
        $this->configureDatabase();
        $this->configureDates();
        $this->configureGates();
        $this->configureEvents();
        $this->configureRateLimiters();
        $this->configureScramble();
        //        $this->configureHttpClient();
        //        $this->configureVite();
        //        $this->configureURL();
    }

    private function configureDatabase(): void
    {
        DB::prohibitDestructiveCommands($this->app->isProduction());
        DB::listen(function (QueryExecuted $event) {
            if ($event->time > 1000) {
                Log::alert('Query took too long', [
                    'connectionName' => $event->connectionName,
                    'sql' => $event->sql,
                    'bindings' => $event->bindings,
                ]);
            }
        });
    }

    private function configureHttpClient(): void
    {
        Http::preventStrayRequests();
    }

    private function configureModels(): void
    {
        Model::unguard();
        Model::shouldBeStrict();
    }

    private function configureDates(): void
    {
        Date::macro('inApplicationTimezone', fn () => $this->setTimezone(config('app.timezone_display')));
        Date::macro(
            'inUserTimezone',
            fn () => $this->setTimezone(auth()->user()->timezone ?? config('app.timezone_display'))
        );
        Date::use(CarbonImmutable::class);
    }

    private function configureEvents(): void
    {
        //
    }

    private function configureScramble(): void
    {
        $adminPrefix = config('app.route_prefix.admin');

        Scramble::afterOpenApiGenerated(function (OpenApi $openApi): void {
            $openApi->secure(SecurityScheme::http('bearer'));
        });

        Scramble::registerApi('admin', ['api_path' => 'api/'.$adminPrefix])
            ->routes(fn (Route $route) => Str::startsWith($route->uri, 'api/'.$adminPrefix));
    }

    private function configureGates(): void
    {
        Gate::define('viewLogViewer', fn (User $user) => $user->isDeveloper());
        Gate::define('viewPulse', fn (User $user) => $user->isDeveloper());
        Gate::define('viewApiDocs', fn (User $user) => $user->isSuperAdmin());
        Gate::define('viewAdmin', fn (User $user) => $user->isAdmin() ? Response::allow() : Response::denyWithStatus(401));
    }

    private function configureVite(): void
    {
        Vite::useAggressivePrefetching();
    }

    private function configureURL(): void
    {
        URL::forceHttps();
    }

    private function configureRateLimiters(): void
    {
        RateLimiter::for('guest', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip());
        });

        RateLimiter::for('authenticated', function (Request $request) {
            return Limit::perMinute(60)->by($request->ip());
        });
    }
}
