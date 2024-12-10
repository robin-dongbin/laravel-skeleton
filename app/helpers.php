<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * Retrieve the currently-authenticated user.
 */
function user(): ?User
{
    return Auth::user();
}
