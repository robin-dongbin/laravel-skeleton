<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::query()->get();

        return RoleResource::collection($roles);
    }
}
