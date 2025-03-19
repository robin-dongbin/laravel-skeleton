<?php

use App\Http\Controllers\Api\V1\AuthenticatedUser\IndexController;
use App\Http\Controllers\Api\V1\AuthenticatedUser\PasswordController;
use Illuminate\Support\Facades\Route;

Route::get('/', [IndexController::class, 'show'])->name('show');
Route::put('/', [IndexController::class, 'update'])->name('update');
Route::put('/password', [PasswordController::class, 'update'])->name('password.update');
