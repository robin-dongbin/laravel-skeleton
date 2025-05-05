<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Dedoc\Scramble\Attributes\QueryParameter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<UserResource>>
     */
    #[QueryParameter('per_page', description: 'Number of items per page.', type: 'int', default: 15)]
    #[QueryParameter('page', description: 'Current page', type: 'int')]
    #[QueryParameter('sort', description: 'Field to sort by', type: 'string', default: '-id', example: 'created_at')]
    #[QueryParameter('filter[username]', description: 'Filter by username', type: 'string')]
    #[QueryParameter('filter[nickname]', description: 'Filter by nickname', type: 'string')]
    #[QueryParameter('filter[status]', description: 'Filter by status', type: 'string', default: 'active', example: [
        'active', 'banned', 'all',
    ])]
    public function index(Request $request)
    {
        $users = QueryBuilder::for(User::class)
            ->allowedFilters([
                AllowedFilter::exact('username'),
                AllowedFilter::exact('nickname'),
                AllowedFilter::exact('role'),
                AllowedFilter::scope('status')->default('active'),
            ])
            ->allowedSorts(['id', 'created_at'])
            ->allowedFields(['id', 'username'])
            ->defaultSort('-id')
            ->paginate($this->perPage($request));

        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->validated());

        return UserResource::make($user)->response()->setStatusCode(201);
    }

    public function show(User $user)
    {
        return UserResource::make($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->validated());

        if ($user->isDirty('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return UserResource::make($user);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
