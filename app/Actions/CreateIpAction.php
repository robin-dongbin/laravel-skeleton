<?php

namespace App\Actions;

use App\Enums\IpStatus;
use App\Models\Ip;

class CreateIpAction
{
    public function handle(array $data): Ip
    {
        $address = data_get($data, 'address');

        $ip = Ip::query()->where('address', $address)->first();

        if (! $ip) {
            $ip = Ip::create([
                'address' => $address,
                'location' => data_get($data, 'location'),
                'status' => data_get($data, 'status', IpStatus::Active),
                'remark' => data_get($data, 'remark'),
            ]);
        }

        return $ip;
    }
}
