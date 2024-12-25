<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'api.'], function () {
    Route::middleware(['guest'])->post('/login', [AuthController::class, 'login'])->name('login');
    Route::middleware(['guest'])->post('/register', [AuthController::class, 'register'])->name('register');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        Route::apiResource('/profile', ProfileController::class)->only(['show', 'update']);

        Route::apiResource('/roles', RoleController::class)->only('index');
        Route::apiResource('/users', UserController::class);
    });
});
