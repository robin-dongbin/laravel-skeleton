<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\AuthenticatedUserController;
use App\Http\Controllers\Api\V1\AuthenticatedUserPasswordController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register'])->name('register');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::name('user.')->prefix('user')->group(function () {
        Route::get('/', [AuthenticatedUserController::class, 'show'])->name('show');
        Route::put('/', [AuthenticatedUserController::class, 'update'])->name('update');
        Route::patch('/password', [AuthenticatedUserPasswordController::class, 'update'])->name('password.update');
    });
});
