<?php

namespace App\Enums;

use App\Enums\Concerns\AsOption;
use App\Enums\Concerns\Translatable;
use Cerbero\Enum\Attributes\Meta;
use Cerbero\Enum\Concerns\Enumerates;

#[Meta(color: 'gray')]
enum UserStatus: int
{
    use AsOption, Enumerates, Translatable;

    #[Meta(color: 'cyan')]
    case Pending = 0;
    #[Meta(color: 'green')]
    case Approved = 1;
    #[Meta(color: 'red')]
    case Rejected = 2;
    #[Meta(color: 'dark')]
    case Banned = 10;
}
