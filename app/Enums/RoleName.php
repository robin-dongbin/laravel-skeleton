<?php

namespace App\Enums;

use App\Enums\Metadata\Translation;
use ArchTech\Enums\Meta\Meta;
use ArchTech\Enums\Metadata;
use ArchTech\Enums\Values;

#[Meta(Translation::class)]
enum RoleName: string
{
    use Metadata, Values;

    #[Translation('Admin')]
    case Admin = 'admin';
    #[Translation('User')]
    case User = 'user';
}
