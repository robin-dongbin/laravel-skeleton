<?php

use Illuminate\Support\Facades\Route;

$adminPrefix = config('app.route_prefix.admin');

Route::name('api.admin.')->prefix($adminPrefix)->group(base_path('routes/api_admin.php'));
Route::name('api.v1.')->prefix('v1')->group(base_path('routes/api_v1.php'));
