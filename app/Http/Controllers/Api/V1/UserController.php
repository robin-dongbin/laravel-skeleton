<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<UserResource>>
     */
    public function index(Request $request)
    {
        Gate::authorize('view-any', User::class);

        $users = User::query()
            ->searchByQueryString()
            ->sortByQueryString()
            ->filterByQueryString()
            ->paginate($this->limit($request));

        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());

        return UserResource::make($user);
    }

    public function show(User $user)
    {
        return UserResource::make($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        Gate::authorize('update', $user);

        $user->update($request->validated());

        return UserResource::make($user);

    }

    public function destroy(User $user)
    {
        Gate::authorize('delete', $user);

        $user->delete();

        return response()->noContent();
    }
}
