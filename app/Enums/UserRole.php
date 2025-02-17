<?php

namespace App\Enums;

enum UserRole: int
{
    case Root = 0;
    case Admin = 1;
    case Member = 2;
}
