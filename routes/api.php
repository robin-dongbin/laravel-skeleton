<?php

use Illuminate\Support\Facades\Route;

Route::name('v1.')->prefix('v1')->group(function () {
    require_once __DIR__.'/api_v1.php';
});

Route::name('admin.')->prefix('admin')->group(function () {
    require_once __DIR__.'/api_admin.php';
});
