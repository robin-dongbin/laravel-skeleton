<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\AuthenticatedUserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')->prefix('admin')->group(function () {
    Route::middleware(['guest'])->group(function () {
        Route::inertia('login', 'Auth/Login')->name('login');
        Route::post('login', [AuthController::class, 'login'])->name('login');
    });

    Route::middleware(['auth'])->group(function () {
        Route::redirect('/', '/admin/dashboard')->name('home');

        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        Route::get('/dashboard', DashboardController::class)->name('dashboard');
        Route::get('/user', [AuthenticatedUserController::class, 'show']);
        Route::put('/user', [AuthenticatedUserController::class, 'update']);

        Route::apiResource('/roles', RoleController::class)->only('index');
        Route::apiResource('/users', UserController::class);
    });
});
