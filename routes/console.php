<?php

use App\Models\AccessToken;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('model:prune', ['--except' => [AccessToken::class]])
    ->timezone(config('app.timezone_display'))
    ->dailyAt('02:00')
    ->runInBackground();

Schedule::command('model:prune', ['--model' => [AccessToken::class]])
    ->everyMinute()
    ->runInBackground();
