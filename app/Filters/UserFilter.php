<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class UserFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        return $query->whereHas($property, function (Builder $query) use ($value) {
            $query->whereAny(['nickname', 'name'], $value);
        });
    }
}
