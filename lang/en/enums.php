<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Enums\UserStatus;

return [
    UserRole::SuperAdmin->name => 'Root',
    UserRole::Admin->name => 'Admin',
    UserRole::Member->name => 'Member',
    UserStatus::Pending->name => 'Pending',
    UserStatus::Approved->name => 'Approved',
    UserStatus::Rejected->name => 'Rejected',
    UserStatus::Banned->name => 'Banned',
];
