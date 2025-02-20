<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()
            ->create([
                'name' => 'Root',
                'username' => 'root',
                'nickname' => 'Root',
                'password' => Hash::make('123456'),
                'email' => 'root@app.com',
                'role' => UserRole::Root,
            ]);

        User::factory()
            ->create([
                'name' => 'Admin',
                'username' => 'admin',
                'nickname' => 'Admin',
                'password' => Hash::make('123456'),
                'email' => 'admin@app.com',
                'role' => UserRole::Admin,
            ]);

        User::factory(100)->create();
    }
}
