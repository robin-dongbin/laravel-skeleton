<?php

use App\Http\Controllers\Api\AuthenticatedTokenController;
use App\Http\Controllers\Api\AuthenticatedUserController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'api.'], function () {
    Route::middleware(['guest'])->post('/login', [AuthenticatedTokenController::class, 'store'])->name('login');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthenticatedTokenController::class, 'destroy'])->name('logout');

        Route::get('/user', [AuthenticatedUserController::class, 'show'])->name('user.show');
        Route::put('/user', [AuthenticatedUserController::class, 'update'])->name('user.update');

        Route::apiResource('roles', RoleController::class)->only('index');
        Route::apiResource('users', UserController::class);
    });
});
