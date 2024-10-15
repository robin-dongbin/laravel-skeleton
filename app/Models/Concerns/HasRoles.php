<?php

namespace App\Models\Concerns;

use App\Enums\RoleName;
use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasRoles
{
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    public function hasRole(string|RoleName|Role $role): bool
    {
        $this->loadMissing('roles');

        $name = $role instanceof Role ? $role->name : $role;

        return $this->roles->contains('name', $name);
    }
}
