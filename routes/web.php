<?php

use App\Http\Controllers\InstallController;
use Dedoc\Scramble\Scramble;
use Illuminate\Support\Facades\Route;

$adminPrefix = config('app.route_prefix.admin');

Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::get('install', InstallController::class)->name('install');

Route::view($adminPrefix.'{any}', 'admin')->where('any', '.*');

Route::get('/test', function () {
    $user = \App\Models\User::withTrashed()->find(103);
    $user->forceDelete();
});
