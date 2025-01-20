<?php

Route::get('/test', function () {
    //   User
    dd(now(), now()->inAdminTimezone());
});
