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
use Spatie\QueryBuilder\QueryBuilder;

class UserController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<UserResource>>
     */
    #[QueryParameter('per_page', description: 'Number of items per page.', type: 'int', default: 15)]
    #[QueryParameter('page', description: 'Current page', type: 'int')]
    #[QueryParameter('search', description: 'Search query string', type: 'string')]
    #[QueryParameter('sort[id]', description: 'Sort by id', type: 'string', example: 'asc|desc')]
    #[QueryParameter('sort[created_at]', description: 'Sort by created_at', type: 'string', example: 'asc|desc')]
    #[QueryParameter('username', description: 'Filter by username', type: 'string')]
    public function index(Request $request)
    {
        $users = QueryBuilder::for(User::class)
            ->allowedFilters(['username', 'nickname'])
            ->allowedSorts(['id', 'created_at'])
            ->allowedFields(['id', 'username'])
            ->paginate($this->perPage($request));

        return UserResource::collection($users);
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());

        return UserResource::make($user)->response()->setStatusCode(201);
    }

    public function show(User $user)
    {
        return UserResource::make($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());

        return UserResource::make($user);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
