<?php

use Dedoc\Scramble\Scramble;
use Illuminate\Support\Facades\Route;

$adminPrefix = config('app.route_prefix.admin');

Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::redirect('/', '/up');

Route::name('admin.')->prefix($adminPrefix)->group(base_path('routes/admin.php'));
