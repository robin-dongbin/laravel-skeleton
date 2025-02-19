<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
    public function perPage(Request $request): int
    {
        return $request->integer('per_page', min(15, 500));
    }
}
