<?php

namespace App\Enums\Concerns;

use Illuminate\Support\Collection;

trait AsOption
{
    public static function options(): Collection
    {
        return collect(self::cases())
            ->map(fn (self $item): array => [
                'name' => (string) $item->name,
                'label' => (string) $item->trans(),
                'value' => (string) $item->value,
                'color' => (string) $item->color(),
            ]);
    }
}
