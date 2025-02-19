<?php

use Illuminate\Support\Facades\Route;

Route::name('admin.')->prefix('admin')->group(base_path('routes/api_admin.php'));
Route::name('v1.')->prefix('v1')->group(base_path('routes/api_v1.php'));
