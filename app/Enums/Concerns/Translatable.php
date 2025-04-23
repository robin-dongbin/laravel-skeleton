<?php

namespace App\Enums\Concerns;

trait Translatable
{
    public function trans($replace = [], $locale = null): string
    {
        return __('enums.'.$this->name, $replace, $locale);
    }
}
