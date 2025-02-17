<?php

Route::get('/test', function () {
    //   User
    return now()->toDateTimeString();
});

require_once __DIR__.'/admin.php';
