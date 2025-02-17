<?php

namespace App\Http\Controllers\Admin;

use App\Models\Role;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::query()->get();

        return Inertia::modal('Roles/Index');
    }
}
