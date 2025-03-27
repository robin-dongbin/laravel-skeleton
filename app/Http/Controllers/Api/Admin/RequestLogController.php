<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Controller;
use App\Http\Resources\RequestLogResource;
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
    public function index(Request $request)
    {
        $requestLogs = QueryBuilder::for(RequestLog::class)
            ->allowedFilters([
                AllowedFilter::exact('method'),
                AllowedFilter::exact('response_status'),
            ])
            ->defaultSort('-id')
            ->allowedSorts(['id', 'duration', 'memory'])
            ->with(['user'])
            ->allowedIncludes(['user'])
            ->paginate($this->perPage($request));

        return RequestLogResource::collection($requestLogs);
    }

    public function show(RequestLog $requestLog)
    {
        return RequestLogResource::make($requestLog);
    }
}
