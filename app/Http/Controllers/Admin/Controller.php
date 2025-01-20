<?php

namespace App\Http\Controllers\Admin;

abstract class Controller
{
    public function limit(): int
    {
        $limit = request('limit', 25);

        return min($limit, 500);
    }
}
