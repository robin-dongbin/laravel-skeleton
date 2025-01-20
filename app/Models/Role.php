<?php

namespace App\Models;

use App\Enums\RoleName;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    protected function casts(): array
    {
        return [
            'name' => RoleName::class,
        ];
    }
}
