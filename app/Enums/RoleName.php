<?php

namespace App\Enums;

use App\Enums\Concerns\Translatable;

enum RoleName: string
{
    use Translatable;

    case Admin = 'admin';
    case User = 'user';
}
