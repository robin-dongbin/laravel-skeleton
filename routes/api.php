<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\AuthenticatedUserController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::name('api.')->prefix('v1')->group(function () {
    Route::middleware(['guest'])->post('/login', [AuthController::class, 'login'])->name('login');
    Route::middleware(['guest'])->post('/register', [AuthController::class, 'register'])->name('register');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        Route::get('/user', [AuthenticatedUserController::class, 'show']);
        Route::put('/user', [AuthenticatedUserController::class, 'update']);

        Route::apiResource('/users', UserController::class);
    });
});
