<?php

namespace Database\Seeders;

use App\Enums\RoleName;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
        ]);

        $user = User::factory()
            ->create([
                'name' => 'Admin',
                'username' => 'admin',
                'nickname' => 'Admin',
                'password' => Hash::make('123456'),
                'email' => 'admin@admin.com',
            ]);

        $role = Role::where('name', RoleName::Admin)->sole();
        $user->roles()->attach($role);

        User::factory(100)->create();
    }
}
