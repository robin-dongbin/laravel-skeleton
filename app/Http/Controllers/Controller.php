<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
    public function perPage(Request $request, $default = 15): int
    {
        return $request->integer('per_page', min($default, 200));
    }
}
