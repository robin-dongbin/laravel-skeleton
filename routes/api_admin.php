<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\AuthenticatedUserController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\Api\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['guest'])->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
});

Route::middleware(['auth:sanctum', 'can:access-admin'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::get('/user', [AuthenticatedUserController::class, 'show'])->name('user.show');
    Route::put('/user', [AuthenticatedUserController::class, 'update'])->name('user.update');

    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::apiResource('/users', UserController::class)->names('users');
});
