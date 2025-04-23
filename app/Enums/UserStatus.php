<?php

namespace App\Enums;

use App\Enums\Concerns\Translatable;
use App\Enums\Contracts\Status;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

enum UserStatus: int implements Status
{
    use Translatable;

    case Pending = 0;
    case Approved = 1;
    case Rejected = 2;
    case Blocked = 10;
    case Banned = 11;

    public static function valueOf(string $name): ?int
    {
        $name = Str::replace(' ', '_', Str::title($name));

        return Arr::first(self::cases(), fn (self $case) => $case->name === $name)?->value;
    }

    public function color(): string
    {
        return match ($this->name) {
            'Approved' => 'green',
            default => 'gray'
        };
    }
}
