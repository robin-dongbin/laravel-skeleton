<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::query()
            ->searchByQueryString()
            ->sortByQueryString()
            ->paginate();

        return UserResource::collection($users);
    }

    public function store() {}

    public function show() {}

    public function update() {}

    public function destroy() {}
}
