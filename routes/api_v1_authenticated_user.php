<?php

use App\Http\Controllers\Api\V1\AuthenticatedUser\IndexController;
use App\Http\Controllers\Api\V1\AuthenticatedUser\PasswordController;
use Illuminate\Support\Facades\Route;

Route::get('/user', [IndexController::class, 'show'])->name('user.show');
Route::put('/user', [IndexController::class, 'update'])->name('user.update');
Route::put('/user/password', [PasswordController::class, 'update'])->name('user.password.update');
