<?php

namespace App\Models\Concerns;

use App\Enums\Role;

trait HasRoles
{
    public function hasRole(string|Role $role): bool
    {
        $name = $role instanceof Role ? $role->value : $role;

        return in_array($name, $this->roles);
    }
}
