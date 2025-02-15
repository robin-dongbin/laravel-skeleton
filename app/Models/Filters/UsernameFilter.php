<?php

namespace App\Models\Filters;

use Lacodix\LaravelModelFilter\Enums\FilterMode;
use Lacodix\LaravelModelFilter\Filters\StringFilter;

class UsernameFilter extends StringFilter
{
    public FilterMode $mode = FilterMode::EQUAL;

    protected string $queryName = 'username';

    protected string $field = 'username';

    public function title(): string
    {
        return __('Username');
    }
}
