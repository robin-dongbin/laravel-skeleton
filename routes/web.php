<?php

Route::redirect('/login', '/')->name('login');

Route::get('/test', function () {
    logger('test', ['test' => 'test']);
});