<?php

use App\Http\Controllers\Api\Admin\RoleController;
use Dedoc\Scramble\Scramble;

Route::get('/test', function () {
    return now()->toDateTimeString();
});
Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
