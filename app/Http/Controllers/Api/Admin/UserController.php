<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Dedoc\Scramble\Attributes\QueryParameter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<UserResource>>
     */
    #[QueryParameter('per_page', description: 'Number of items per page.', type: 'int', default: 15)]
    #[QueryParameter('page', description: 'Current page', type: 'int')]
    #[QueryParameter('search', description: 'Search query string', type: 'string')]
    #[QueryParameter('sort', description: 'Sort by field', type: 'array', example: 'sort[created_at]=asc')]
    #[QueryParameter('username', description: 'Filter by username', type: 'string')]
    public function index(Request $request)
    {
        Gate::authorize('view-any', User::class);

        $users = User::query()
            ->searchByQueryString()
            ->sortByQueryString()
            ->filterByQueryString()
            ->paginate($this->perPage($request));

        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request)
    {
        Gate::authorize('create', User::class);

        $user = User::create($request->validated());

        return UserResource::make($user);
    }

    public function show(User $user)
    {
        Gate::authorize('view', $user);

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
