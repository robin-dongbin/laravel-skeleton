<?php

namespace App\Enums\Metadata;

use ArchTech\Enums\Meta\MetaProperty;
use Attribute;

#[Attribute]
class Translation extends MetaProperty
{
    protected function transform(mixed $value): mixed
    {
        return __($value);
    }
}
