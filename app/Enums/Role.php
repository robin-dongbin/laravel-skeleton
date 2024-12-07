<?php

namespace App\Enums;

use App\Enums\Concerns\Translatable;

enum Role: string
{
    use Translatable;

    case Admin = 'admin';
    case Member = 'member';
}
