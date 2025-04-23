<?php

namespace App\Enums\Contracts;

interface Status
{
    public function trans($replace = [], $locale = null): string;
}
