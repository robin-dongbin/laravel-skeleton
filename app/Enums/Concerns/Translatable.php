<?php

namespace App\Enums\Concerns;

trait Translatable
{
    public function trans(): string
    {
        return __('enums.'.$this->name);
    }
}
