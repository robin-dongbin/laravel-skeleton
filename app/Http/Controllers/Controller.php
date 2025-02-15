<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
    public function limit(Request $request): int
    {
        return $request->integer('limit', min(15, 500));
    }
}
