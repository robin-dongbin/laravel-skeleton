<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\AuthenticatedUserController;
use App\Http\Controllers\Api\Admin\AuthenticatedUserPasswordController;
use App\Http\Controllers\Api\Admin\AuthenticationLogController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\EnumController;
use App\Http\Controllers\Api\Admin\IpController;
use App\Http\Controllers\Api\Admin\MediaController;
use App\Http\Controllers\Api\Admin\RequestLogController;
use App\Http\Controllers\Api\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:guest', 'guest'])->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware(['auth:sanctum', 'can:viewAdmin'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/enums', EnumController::class)->name('enums');
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::apiResource('/users', UserController::class)->names('users');
    Route::apiResource('/ips', IpController::class)->names('ips');
    Route::apiResource('/request-logs', RequestLogController::class)->names('request-logs')->only(['index', 'show']);
    Route::apiResource('/media', MediaController::class)->names('media');
    Route::apiResource('/authentication-logs',
        AuthenticationLogController::class)->names('authentication-logs')->only(['index', 'show']);

    Route::name('user.')->prefix('user')->group(function () {
        Route::get('/', [AuthenticatedUserController::class, 'show'])->name('show');
        Route::put('/', [AuthenticatedUserController::class, 'update'])->name('update');
        Route::patch('/password', [AuthenticatedUserPasswordController::class, 'update'])->name('password.update');
    });
});
