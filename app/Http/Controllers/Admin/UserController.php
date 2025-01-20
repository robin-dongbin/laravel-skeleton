<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\UserResource;
use App\Models\User;
use Knuckles\Scribe\Attributes\Endpoint;
use Knuckles\Scribe\Attributes\Group;
use Knuckles\Scribe\Attributes\Response;
use Knuckles\Scribe\Attributes\ResponseFromApiResource;

#[Group('Users')]
class UserController extends Controller
{
    #[Endpoint('List')]
    #[ResponseFromApiResource(UserResource::class, User::class, collection: true, paginate: 25)]
    public function index()
    {
        $users = User::query()
            ->searchByQueryString()
            ->sortByQueryString()
            ->paginate($this->limit());

        return UserResource::collection($users);
    }

    #[Endpoint('Store')]
    #[ResponseFromApiResource(UserResource::class, User::class)]
    public function store()
    {
        //
    }

    #[Endpoint('Show')]
    #[ResponseFromApiResource(UserResource::class, User::class)]
    public function show($id)
    {
        $user = User::findOrFail($id);

        return UserResource::make($user);
    }

    #[Endpoint('Update')]
    #[ResponseFromApiResource(UserResource::class, User::class)]
    public function update()
    {
        //
    }

    #[Endpoint('Destroy')]
    #[Response(status: 204)]
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->noContent();
    }
}
