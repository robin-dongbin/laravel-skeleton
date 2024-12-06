<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::factory()
            ->create([
                'name' => 'Admin',
                'username' => 'admin',
                'nickname' => 'Admin',
                'roles' => ['admin', 'member'],
                'password' => Hash::make('123456'),
                'email' => 'admin@admin.com',
            ]);

        User::factory(100)->create();
    }
}
