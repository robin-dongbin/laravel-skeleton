<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\AuthenticatedUserController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')->group(function () {
    Route::middleware(['guest'])->post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        Route::get('/user', [AuthenticatedUserController::class, 'show']);
        Route::put('/user', [AuthenticatedUserController::class, 'update']);

        Route::apiResource('/roles', RoleController::class)->only('index');
        Route::apiResource('/users', UserController::class);
    });
});
