<?php

namespace App\Enums;

use App\Enums\Concerns\AsOption;
use App\Enums\Concerns\Translatable;
use Cerbero\Enum\Attributes\Meta;
use Cerbero\Enum\Concerns\Enumerates;

#[Meta(color: 'gray')]
enum UserRole: int
{
    use AsOption,Enumerates ,Translatable;

    #[Meta(color: 'violet')]
    case SuperAdmin = 1;
    #[Meta(color: 'grape')]
    case Admin = 2;
    #[Meta(color: 'cyan')]
    case Member = 10;
}
