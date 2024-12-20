<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use Orion\Facades\Orion;

Route::group(['as' => 'api.'], function () {
    Route::middleware(['guest'])->post('/login', [AuthController::class, 'login'])->name('login');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/user', [ProfileController::class, 'show'])->name('profile.show');
        Route::put('/user', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        Orion::resource('users', UserController::class);
        Orion::resource('roles', RoleController::class);
    });
});
