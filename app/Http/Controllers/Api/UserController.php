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

    public function store()
    {
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return UserResource::make($user);
    }

    public function update()
    {
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->noContent();
    }
}
