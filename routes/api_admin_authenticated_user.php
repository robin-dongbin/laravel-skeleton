<?php

use App\Http\Controllers\Api\Admin\AuthenticatedUser\IndexController;
use App\Http\Controllers\Api\Admin\AuthenticatedUser\PasswordController;
use Illuminate\Support\Facades\Route;

Route::name('user.')->prefix('/user')->group(function () {
    Route::get('/', [IndexController::class, 'show'])->name('show');
    Route::put('/', [IndexController::class, 'update'])->name('update');
    Route::put('/password', [PasswordController::class, 'update'])->name('password.update');
});
