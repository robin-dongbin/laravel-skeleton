<?php

namespace App\Enums;

use App\Enums\Concerns\Translatable;
use Illuminate\Support\Collection;

enum UserRole: int
{
    use Translatable;

    case Root = 1;
    case Admin = 2;
    case Member = 10;

    public static function options(): Collection
    {
        return collect(self::cases())
            ->map(fn (self $item): array => [
                'label' => $item->trans(),
                'value' => $item->value,
            ]);
    }
}
