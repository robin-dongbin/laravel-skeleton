<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Api\Controller;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = UserRole::options();

        return RoleResource::collection($roles);
    }
}
