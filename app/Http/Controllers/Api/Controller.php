<?php

namespace App\Http\Controllers\Api;


abstract class Controller
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
