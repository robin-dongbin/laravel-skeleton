<?php

namespace App\Http\Controllers\Web\Admin;

use Inertia\Inertia;

class IndexController
{
    public function __invoke()
    {
        return Inertia::render('dashboard');
    }
}
