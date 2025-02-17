<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;

class RolePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole(UserRole::Admin);
    }

    public function view(User $user, UserRole $role): bool
    {
        return $user->hasRole(UserRole::Admin);
    }

    public function create(User $user): bool
    {
        return $user->hasRole(UserRole::Admin);
    }

    public function update(User $user, UserRole $role): bool
    {
        return $user->hasRole(UserRole::Admin);
    }

    public function delete(User $user, UserRole $role): bool
    {
        return $user->hasRole(UserRole::Admin);
    }

    public function restore(User $user, UserRole $role): bool
    {
        return $user->hasRole(UserRole::Admin);
    }

    public function forceDelete(User $user, UserRole $role): bool
    {
        return $user->hasRole(UserRole::Admin);
    }
}
