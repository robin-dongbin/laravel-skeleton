<?php

namespace Database\Seeders;

use App\Models\Ip;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Ip::factory()
            ->privileged()
            ->create(['address' => '127.0.0.1']);
        Ip::factory()
            ->count(10)
            ->create();

        User::factory()
            ->admin()
            ->approved()
            ->create([
                'username' => 'dev',
                'nickname' => 'Developer',
                'password' => Hash::make('123456'),
                'email' => 'dev@app.com',
            ]);

        User::factory()
            ->admin()
            ->approved()
            ->create([
                'username' => 'admin',
                'nickname' => 'Admin',
                'password' => Hash::make('123456'),
                'email' => 'admin@app.com',
            ]);

        $users = User::factory()
            ->count(100)
            ->create();
    }
}
