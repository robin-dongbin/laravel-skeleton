<?php

use App\Http\Controllers\InstallController;
use Dedoc\Scramble\Scramble;

Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::get('install', InstallController::class)->name('install');

Route::view('21232f297a57a5a743894a0e4a801fc3{any}', 'admin')->where('any', '.*');
