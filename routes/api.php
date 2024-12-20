<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AuthenticatedUserController;
use App\Http\Controllers\Api\RoleController;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'api.'], function () {
    Route::middleware(['guest'])->post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/user', [AuthenticatedUserController::class, 'show'])->name('user.show');
        Route::put('/user', [AuthenticatedUserController::class, 'update'])->name('user.update');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

//        Orion::resource('users', UserController::class);
        Route::apiResource('roles', RoleController::class);
    });
});
