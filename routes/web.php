<?php

use Dedoc\Scramble\Scramble;

Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::view('admin{any}', 'admin')->where('any', '.*');
