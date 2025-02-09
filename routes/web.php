<?php

use Dedoc\Scramble\Scramble;

Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::get('/test', function () {
    //   User
    dd(now(), now()->inApplicationTimezone());
});

require_once __DIR__.'/admin.php';
