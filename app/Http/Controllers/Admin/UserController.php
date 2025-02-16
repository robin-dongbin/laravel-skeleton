<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;

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
            'data' => $users,
        ]);
    }

    public function edit(User $user)
    {
        return inertia('Users/Edit', [
            'user' => $user,
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back();
    }
}
