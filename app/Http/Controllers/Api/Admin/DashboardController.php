<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Admin\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        return inertia('Dashboard', []);
    }
}
