<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\CreateIpAction;
use App\Http\Controllers\Api\Controller;
use App\Http\Requests\IpRequest;
use App\Http\Resources\IpResource;
use App\Models\Ip;
use Dedoc\Scramble\Attributes\QueryParameter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class IpController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<IpResource>>
     */
    #[QueryParameter('per_page', description: 'Number of items per page.', type: 'int', default: 15)]
    #[QueryParameter('page', description: 'Current page', type: 'int')]
    #[QueryParameter('sort', description: 'Field to sort by', type: 'string', default: '-id', example: 'created_at')]
    #[QueryParameter('filter[address]', description: 'Filter by username', type: 'string')]
    #[QueryParameter('filter[status]', description: 'Filter by status', type: 'string', default: 'active', example: [
        'active', 'banned', 'all',
    ])]
    public function index(Request $request)
    {
        $ips = QueryBuilder::for(Ip::class)
            ->allowedFilters([
                AllowedFilter::exact('address'),
                AllowedFilter::scope('status')->default('active'),
            ])
            ->allowedSorts(['id', 'created_at'])
            ->allowedIncludes(['user', 'requestLogs'])
            ->defaultSort('-id')
            ->paginate($this->perPage($request));

        return IpResource::collection($ips);
    }

    public function store(IpRequest $request, CreateIpAction $action)
    {
        $ip = $action->handle($request->validated());

        return IpResource::make($ip);
    }

    public function show(Ip $ip)
    {
        return IpResource::make($ip);
    }

    public function update(IpRequest $request, Ip $ip)
    {
        $ip->update($request->validated());

        return IpResource::make($ip);
    }

    public function destroy(Ip $ip)
    {
        $ip->delete();

        return response()->noContent();
    }
}
