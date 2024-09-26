<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection as BaseAnonymousResourceCollection;

class AnonymousResourceCollection extends BaseAnonymousResourceCollection
{
    public function paginationInformation($request, $paginated, $default): array
    {
        unset($default['meta']['links']);

        return $default;
    }
}
