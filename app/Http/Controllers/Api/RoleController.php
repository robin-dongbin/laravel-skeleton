<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return Role::query()->get();
    }
}
