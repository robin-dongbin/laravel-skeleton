<?php

namespace App\Http\Controllers\Api;

use Orion\Http\Controllers\Controller as BaseController;

abstract class Controller extends BaseController
{
    public function limit(): int
    {
        return 25;
    }

    public function maxLimit(): int
    {
        return 500;
    }
}
