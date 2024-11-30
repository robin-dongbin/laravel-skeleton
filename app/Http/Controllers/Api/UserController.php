<?php

namespace App\Http\Controllers\Api;

use App\Models\User;

class UserController extends Controller
{
    protected $model = User::class;

    public function searchableBy(): array
    {
        return ['username', 'nickname'];
    }

    public function sortableBy(): array
    {
        return ['id', 'username'];
    }
}
