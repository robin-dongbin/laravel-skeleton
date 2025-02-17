<?php

namespace App\Models\Concerns;

use App\Enums\UserRole;

trait HasRole
{
    public function hasRole(UserRole $role): bool
    {
        return $this->role === $role;
    }
}
