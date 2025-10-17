<?php

use App\Http\Controllers\Web\Admin\AuthController;
use App\Http\Controllers\Web\Admin\IndexController;
use Illuminate\Support\Facades\Route;

Route::middleware(['guest'])->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware([])->group(function () {
    Route::get('/', IndexController::class)->name('home');
});
