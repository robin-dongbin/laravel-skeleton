<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query()
            ->searchByQueryString()
            ->sortByQueryString()
            ->filterByQueryString()
            ->paginate($this->limit($request));

        return inertia('Users/Index', [
            'filters' => $this->filters(User::class),
            'data' => fn () => $users,
        ]);
    }

    /**
     * @return UserResource
     */
    public function show(User $user)
    {
        return UserResource::make($user);
    }

    /**
     * @return Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->noContent();
    }
}
