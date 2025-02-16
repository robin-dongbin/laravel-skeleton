<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Tables\Table;
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

        $table = Table::make($users)
            ->searchable()
            ->filterable()
            ->column(key: 'id', title: '#')
            ->column(key: 'username', title: __('Username'))
            ->column(key: 'nickname', title: __('Nickname'))
            ->editAction(fn (User $record) => route('admin.users.edit', $record->id))
            ->deleteAction(fn (User $record) => route('admin.users.destroy', $record->id));

        return inertia('Users/Index', [
            'table' => $table,
        ]);
    }

    public function edit(User $user)
    {
        return inertia('Users/Edit');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back();
    }
}
