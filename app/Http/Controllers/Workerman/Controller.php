<?php

namespace App\Http\Controllers\Workerman;

use App\Models\User;
use Workerman\Protocols\Http\Request;

class Controller
{
    public function index(Request $request)
    {
        $user = User::find(1);

        return response()->json($user);
    }
}
