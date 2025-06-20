<?php

declare(strict_types=1);

use App\Enums\IpStatus;
use App\Enums\UserRole;
use App\Enums\UserStatus;

return [
    UserRole::SuperAdmin->name => '超级管理员',
    UserRole::Admin->name => '管理员',
    UserRole::Member->name => '会员',
    IpStatus::Active->name => '活跃',
    IpStatus::Privileged->name => '特权用户',
    IpStatus::Blocked->name => '已拦截',
    UserStatus::Pending->name => '待审核',
    UserStatus::Approved->name => '已通过',
    UserStatus::Banned->name => '已封禁',
];
