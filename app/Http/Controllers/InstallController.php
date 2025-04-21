<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class InstallController
{
    public function __invoke()
    {
        $installed = (bool) User::find(1);

        if ($installed) {
            return view('install')->with('message', 'Already installed');
        }

        User::create([
            'name' => 'Developer',
            'username' => 'dev',
            'nickname' => 'Developer',
            'password' => Hash::make('123456'),
            'email' => 'dev@app.com',
            'role' => UserRole::Root,
            'status' => UserStatus::Approved,
        ]);

        User::create([
            'name' => 'Root',
            'username' => 'root',
            'nickname' => 'Root',
            'password' => Hash::make('123456'),
            'email' => 'root@app.com',
            'role' => UserRole::Root,
            'status' => UserStatus::Approved,
        ]);

        User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'nickname' => 'Admin',
            'password' => Hash::make('123456'),
            'email' => 'admin@app.com',
            'role' => UserRole::Admin,
            'status' => UserStatus::Approved,
        ]);

        return view('install')->with('message', 'Installation completed successfully');
    }
}
