<?php

namespace App\Enums\Concerns;

trait Translatable
{
    public function translation(): string
    {
        return __($this->name);
    }
}
