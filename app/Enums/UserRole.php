<?php

namespace App\Enums;

use App\Enums\Concerns\Translatable;
use Illuminate\Support\Collection;

enum UserRole: int
{
    use Translatable;

    case Root = 0;
    case Admin = 1;
    case Member = 2;

    public static function labels(): array
    {
        return collect(self::cases())->mapWithKeys(fn ($item) => [$item->value => $item->trans()])
            ->toArray();
    }

    public static function options(): Collection
    {
        return collect(self::cases())
            ->map(fn (self $item): array => [
                'label' => $item->trans(),
                'value' => $item->value,
            ]);
    }
}
