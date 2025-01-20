<?php

use Illuminate\Http\JsonResponse;

Route::view('/docs/admin', 'scribe_admin.index');

Route::get('/docs/admin.postman', fn () => new JsonResponse(Storage::disk('local')->get('scribe_admin/collection.json'), json: true))->name('scribe_admin.postman');

Route::get('/docs/admin.openapi', fn () => response()->file(Storage::disk('local')->path('scribe_admin/openapi.yaml')))->name('scribe_admin.openapi');

Route::get('/test', function () {
    //   User
    dd(now(), now()->inAdminTimezone());
});
