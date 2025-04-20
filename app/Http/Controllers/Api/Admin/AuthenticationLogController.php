<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Api\Controller;
use App\Http\Resources\AuthenticationLogResource;
use App\Models\AuthenticationLog;
use Dedoc\Scramble\Attributes\QueryParameter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class AuthenticationLogController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<AuthenticationLogResource>>
     */
    #[QueryParameter('per_page', description: 'Number of items per page.', type: 'int', default: 15)]
    #[QueryParameter('page', description: 'Current page', type: 'int')]
    public function index(Request $request)
    {
        $authenticationLogs = QueryBuilder::for(AuthenticationLog::class)
            ->allowedFilters([
                AllowedFilter::exact('ip_address'),
            ])
            ->defaultSort('-id')
            ->allowedSorts(['id', 'created_at'])
            ->allowedIncludes(['user', 'ip'])
            ->paginate($this->limit($request));

        return AuthenticationLogResource::collection($authenticationLogs);
    }

    public function show(AuthenticationLog $authenticationLog)
    {
        return AuthenticationLogResource::make($authenticationLog);
    }
}
