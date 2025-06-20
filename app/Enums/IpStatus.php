<?php

namespace App\Enums;

use App\Enums\Concerns\AsOption;
use App\Enums\Concerns\Translatable;
use Cerbero\Enum\Attributes\Meta;
use Cerbero\Enum\Concerns\Enumerates;

#[Meta(color: 'gray')]
enum IpStatus: int
{
    use AsOption, Enumerates, Translatable;

    #[Meta(color: 'green')]
    case Active = 1;
    #[Meta(color: 'violet')]
    case Privileged = 2;
    #[Meta(color: 'red')]
    case Blocked = 10;
}
