<?php

use App\Http\Controllers\InstallController;
use Dedoc\Scramble\Scramble;

$adminPrefix = config('app.route_prefix.admin');

Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::get('install', InstallController::class)->name('install');

Route::view('admin{any}', 'admin')->where('any', '.*');
