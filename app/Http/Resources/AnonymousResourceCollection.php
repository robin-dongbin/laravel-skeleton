<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection as BaseAnonymousResourceCollection;

class AnonymousResourceCollection extends BaseAnonymousResourceCollection
{
    public function paginationInformation($request, $paginated, $default): array
    {
        unset($default['links']);
        unset($default['meta']['path']);
        unset($default['meta']['links']);

        return $default;
    }
}
