<?php

use Dedoc\Scramble\Scramble;

Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::get('ip', function () {
    return request()->ips();
});

Route::view('admin', 'admin');
Route::view('admin/{any}', 'admin')->where('any', '.*');
