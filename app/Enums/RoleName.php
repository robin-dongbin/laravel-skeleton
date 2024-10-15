<?php

namespace App\Enums;

use App\Enums\Concerns\Translation;

enum RoleName: string
{
    use Translation;

    case Admin = 'admin';
    case User = 'user';
}
