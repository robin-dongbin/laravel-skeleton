<?php

namespace App\Models\Concerns;

use App\Enums\UserRole;

trait HasRole
{
    public function hasRole(UserRole $role): bool
    {
        return $this->role === $role;
    }

    public function isDeveloper(): bool
    {
        return $this->id === 1;
    }

    public function isSuperAdmin(): bool
    {
        return $this->hasRole(UserRole::SuperAdmin);
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(UserRole::Admin) || $this->hasRole(UserRole::SuperAdmin);
    }

    public function isMember(): bool
    {
        return $this->hasRole(UserRole::Member);
    }
}
