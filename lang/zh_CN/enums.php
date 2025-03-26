<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Enums\UserStatus;

return [
    UserRole::Root->name => '根管理员',
    UserRole::Admin->name => '管理员',
    UserRole::Member->name => '会员',
    UserStatus::Pending->name => '待审核',
    UserStatus::Approved->name => '已通过',
    UserStatus::Rejected->name => '已拒绝',
    UserStatus::Banned->name => '已禁用',
];
