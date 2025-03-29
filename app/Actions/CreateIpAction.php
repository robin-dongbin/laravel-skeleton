<?php

namespace App\Actions;

use App\Enums\IpStatus;
use App\Models\Ip;
use Stevebauman\Location\Facades\Location;

class CreateIpAction
{
    public function handle(array $data): Ip
    {
        return Ip::where('address', data_get($data, 'address'))->firstOr(function () use ($data) {
            $location = Location::get(data_get($data, 'address'));

            return Ip::create([
                'address' => data_get($data, 'address'),
                'location' => $location,
                'user_id' => data_get($data, 'user_id'),
                'status' => data_get($data, 'status', IpStatus::Active),
                'remark' => data_get($data, 'remark'),
            ]);
        });
    }
}
