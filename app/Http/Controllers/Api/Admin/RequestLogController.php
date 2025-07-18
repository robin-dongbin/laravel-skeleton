<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Controller;
use App\Http\Resources\Admin\RequestLogResource;
use App\Models\RequestLog;
use Dedoc\Scramble\Attributes\QueryParameter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class RequestLogController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<RequestLogResource>>
     */
    #[QueryParameter('per_page', description: 'Number of items per page.', type: 'int', default: 15)]
    #[QueryParameter('page', description: 'Current page', type: 'int')]
    #[QueryParameter('sort', description: 'Field to sort by', type: 'string', default: '-id', example: [
        'id', 'duration', 'memory', 'created_at',
    ])]
    public function index(Request $request)
    {
        $request->validate(['filter.ip_address' => ['nullable', 'ip']]);

        $requestLogs = QueryBuilder::for(RequestLog::class)
            ->allowedFilters([
                AllowedFilter::partial('path'),
                AllowedFilter::exact('method'),
                AllowedFilter::exact('response_status'),
                AllowedFilter::exact('ip_address'),
            ])
            ->allowedSorts(['id', 'duration', 'memory', 'created_at'])
            ->allowedIncludes(['user', 'ip'])
            ->defaultSort('-id')
            ->paginate($this->perPage($request));

        return RequestLogResource::collection($requestLogs);
    }

    public function show(RequestLog $requestLog)
    {
        return RequestLogResource::make($requestLog);
    }
}
