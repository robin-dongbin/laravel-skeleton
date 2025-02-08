<?php

namespace App\Http\Controllers\Workerman;

class Controller
{
    public function index()
    {
        return response()->json(['success' => true]);
    }
}
