<?php

namespace App\Enums\Concerns;

use Illuminate\Contracts\Translation\Translator;
use Illuminate\Foundation\Application;

trait Translation
{
    public function translation(): Application|array|string|Translator|null
    {
        return __($this->name);
    }
}
