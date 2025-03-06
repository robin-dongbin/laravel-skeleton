<?php

namespace App\Providers;

use App\Enums\UserRole;
use App\Models\User;
use Carbon\CarbonImmutable;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\Route;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
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
        $this->configureScramble();
        $this->configureGates();
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
        Carbon::macro('inUserTimezone',
            fn (): Carbon => $this->setTimezone(auth()->user()->timezone ?? config('app.timezone_display')));
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
        Gate::define('viewApiDocs', function (User $user) {
            return $user->hasRole(UserRole::Root);
        });
        Gate::define('access-admin', function (User $user) {
            return $user->hasRole(UserRole::Root) || $user->hasRole(UserRole::Admin);
        });
    }
}
