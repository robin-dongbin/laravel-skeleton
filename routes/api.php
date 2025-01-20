<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::name('api.')->group(function () {
    Route::middleware(['guest'])->post('/login', [AuthController::class, 'login'])->name('login');
    Route::middleware(['guest'])->post('/register', [AuthController::class, 'register'])->name('register');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        Route::apiResource('/profile', ProfileController::class)->only(['show', 'update']);
    });
});
