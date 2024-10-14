<?php

namespace App\Policies;

use App\Enums\RoleName;
use App\Models\Role;
use App\Models\User;

class RolePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasRole(RoleName::Admin);
    }

    public function view(User $user, Role $role): bool
    {
        return $user->hasRole(RoleName::Admin);
    }

    public function create(User $user): bool
    {
        return $user->hasRole(RoleName::Admin);
    }

    public function update(User $user, Role $role): bool
    {
        return $user->hasRole(RoleName::Admin);
    }

    public function delete(User $user, Role $role): bool
    {
        return $user->hasRole(RoleName::Admin);
    }

    public function restore(User $user, Role $role): bool
    {
        return $user->hasRole(RoleName::Admin);
    }

    public function forceDelete(User $user, Role $role): bool
    {
        return $user->hasRole(RoleName::Admin);
    }
}
