<?php

use Dedoc\Scramble\Scramble;
use Illuminate\Http\JsonResponse;

// Route::view('/docs/admin', 'scribe_admin.index');
//
// Route::get('/docs/admin.postman', fn () => new JsonResponse(Storage::disk('local')->get('scribe_admin/collection.json'), json: true))->name('scribe_admin.postman');
//
// Route::get('/docs/admin.openapi', fn () => response()->file(Storage::disk('local')->path('scribe_admin/openapi.yaml')))->name('scribe_admin.openapi');

Scramble::registerUiRoute(path: 'docs/admin', api: 'admin');
Scramble::registerJsonSpecificationRoute(path: 'docs/admin.json', api: 'admin');

Route::get('/test', function () {
    //   User
    dd(now(), now()->inAdminTimezone());
});
