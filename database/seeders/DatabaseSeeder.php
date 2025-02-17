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
        foreach (UserRole::cases() as $role) {
            UserRole::create(['name' => $role]);
        }

        $user = User::factory()
            ->create([
                'name' => 'Admin',
                'username' => 'admin',
                'nickname' => 'Admin',
                'password' => Hash::make('123456'),
                'email' => 'admin@admin.com',
            ]);

        $role = UserRole::where('name', UserRole::Admin)->sole();
        $user->roles()->attach($role);

        User::factory(100)->create();
    }
}
