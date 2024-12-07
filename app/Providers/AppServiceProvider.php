<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Support\ServiceProvider;

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
        Json::decodeUsing(function ($value, $associative) {
            $value = json_decode($value, $associative);
            ksort($value);

            return $value;
        });
    }
}
