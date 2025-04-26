<?php

namespace App\Providers;

use App\Enums\UserRole;
use App\Models\User;
use Carbon\CarbonImmutable;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
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
        $this->configureCommands();
        $this->configureModels();
        $this->configureDates();
        $this->configureHttpClient();
        $this->configureGates();
        $this->configureRateLimiters();
        //        $this->configureVite();
        //        $this->configureURL();
        $this->configureScramble();
    }

    private function configureHttpClient(): void
    {
        Http::preventStrayRequests();
    }

    private function configureCommands(): void
    {
        DB::prohibitDestructiveCommands($this->app->isProduction());
    }

    private function configureModels(): void
    {
        Model::unguard();
        Model::shouldBeStrict();
        Model::automaticallyEagerLoadRelationships();
    }

    private function configureDates(): void
    {
        Date::macro('inApplicationTimezone', fn () => $this->setTimezone(config('app.timezone_display')));
        Date::macro('inUserTimezone',
            fn () => $this->setTimezone(auth()->user()->timezone ?? config('app.timezone_display')));
        Date::use(CarbonImmutable::class);
    }

    private function configureScramble(): void
    {
        Scramble::afterOpenApiGenerated(function (OpenApi $openApi): void {
            $openApi->secure(SecurityScheme::http('bearer'));
        });

        Scramble::registerApi('admin', ['api_path' => 'api/admin'])
            ->routes(fn (Route $route) => Str::startsWith($route->uri, 'api/admin/'));
    }

    private function configureGates(): void
    {
        Gate::define('viewLogViewer', fn (User $user) => $user->id === 1);
        Gate::define('viewPulse', fn (User $user) => $user->id === 1);
        Gate::define('viewApiDocs', fn (User $user) => $user->hasRole(UserRole::Root));
        Gate::define('viewAdmin', fn (User $user) => $user->hasRole(UserRole::Root) || $user->hasRole(UserRole::Admin));
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
        RateLimiter::for('auth', function (Request $request) {
            return Limit::perHour(5)->by($request->ip());
        });

        RateLimiter::for('authenticated', function (Request $request) {
            return Limit::perMinute(60)->by($request->ip());
        });
    }
}
