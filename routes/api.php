<?php

use App\Http\Actions\Auth\UserLogin;
use Illuminate\Support\Facades\Route;


Route::group(['as' => 'api.'], function () {
    Route::post('/login', UserLogin::class)->name('login');
});

