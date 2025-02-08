<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\UserResource;
use App\Models\User;
use Dedoc\Scramble\Attributes\Group;
use Dedoc\Scramble\Attributes\QueryParameter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;

#[Group('User')]
class UserController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<UserResource>>
     */
    #[QueryParameter('page', type: 'int')]
    #[QueryParameter('limit', type: 'int')]
    public function index(Request $request)
    {
        sleep(1);
        $users = User::query()
            ->searchByQueryString()
            ->sortByQueryString()
            ->paginate($this->limit($request));

        return UserResource::collection($users);
    }

    public function store()
    {
        //
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return UserResource::make($user);
    }

    public function update()
    {
        //
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->noContent();
    }
}
