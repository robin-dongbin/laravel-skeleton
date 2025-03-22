<?php

use App\Http\Controllers\Api\Admin\Auth\AuthenticatedTokenController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\RequestLogController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\Api\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('login', [AuthenticatedTokenController::class, 'store'])->name('login');
});

Route::middleware(['auth:sanctum', 'can:access-admin'])->group(function () {
    Route::post('/logout', [AuthenticatedTokenController::class, 'destroy'])->name('logout');

    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::apiResource('/users', UserController::class)->names('users');
    Route::apiResource('/request-logs', RequestLogController::class)->names('request-logs')->only(['index', 'show', 'destroy']);

    Route::name('user.')->prefix('user')->group(base_path('routes/api_admin_authenticated_user.php'));
});
