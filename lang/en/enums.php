<?php

declare(strict_types=1);

use App\Enums\UserRole;

return [
    UserRole::Root->name => '根管理员',
    UserRole::Admin->name => '管理员',
    UserRole::Member->name => '会员',
];
