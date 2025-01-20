<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\AnonymousResourceCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserController extends Controller
{
    /**
     * List available todo items.
     *
     * @response AnonymousResourceCollection<LengthAwarePaginator<UserResource>>
     */
    public function index()
    {
        $users = User::query()
            ->searchByQueryString()
            ->sortByQueryString()
            ->paginate();

        return UserResource::collection($users);
    }

    public function store() {}

    public function show($id)
    {
        $user = User::findOrFail($id);

        return UserResource::make($user);
    }

    public function update() {}

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->noContent();
    }
}
