<?php

namespace App\Actions;

use App\Enums\IpStatus;
use App\Models\Ip;

class CreateIpAction
{
    public function handle(array $data): Ip
    {
        return Ip::updateOrCreate(['address' => data_get($data, 'address')], [
            'location' => data_get($data, 'location'),
            'status' => data_get($data, 'status', IpStatus::Active),
            'remark' => data_get($data, 'remark'),
        ]);
    }
}
