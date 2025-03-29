<?php

namespace App\Enums;

use App\Enums\Concerns\Translatable;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

enum IpStatus: int
{
    use Translatable;

    case Active = 1;
    case Privileged = 2;
    case Blocked = 10;

    public static function valueOf(string $name): ?int
    {
        $name = Str::replace(' ', '_', Str::title($name));

        return Arr::first(self::cases(), fn (self $case) => $case->name === $name)?->value;
    }
}
