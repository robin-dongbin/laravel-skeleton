<?php

namespace App\Http\Controllers\Admin;


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
