<?php

namespace App\Actions;

use App\Enums\IpStatus;
use App\Models\Ip;
use Stevebauman\Location\Facades\Location;

class CreateIpAction
{
    public function handle(array $data): Ip
    {
        $address = data_get($data, 'address');

        $ip = Ip::query()->where('address', $address)->first();

        if (! $ip) {
            $location = Location::get($address);

            $ip = Ip::create([
                'address' => $address,
                'location' => $location,
                'status' => data_get($data, 'status', IpStatus::Active),
                'remark' => data_get($data, 'remark'),
            ]);
        }

        return $ip;
    }
}
