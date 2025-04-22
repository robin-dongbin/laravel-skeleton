import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\RequestLogController::show
 * @see app/Http/Controllers/Api/Admin/RequestLogController.php:39
 * @route /api/admin/request-logs/{request_log}
 */
export const show = (args: { request_log: string | number } | [request_log: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/request-logs\/{request_log}',
}

/**
 * @see \App\Http\Controllers\Api\Admin\RequestLogController::show
 * @see app/Http/Controllers/Api/Admin/RequestLogController.php:39
 * @route /api/admin/request-logs/{request_log}
 */
show.url = (args: { request_log: string | number } | [request_log: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { request_log: args }
    }

    if (Array.isArray(args)) {
        args = {
            request_log: args[0],
        }
    }

    const parsedArgs = {
        request_log: args.request_log,
    }

    return show.definition.url
            .replace('{request_log}', parsedArgs.request_log.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\RequestLogController::show
 * @see app/Http/Controllers/Api/Admin/RequestLogController.php:39
 * @route /api/admin/request-logs/{request_log}
 */
show.get = (args: { request_log: string | number } | [request_log: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\RequestLogController::show
 * @see app/Http/Controllers/Api/Admin/RequestLogController.php:39
 * @route /api/admin/request-logs/{request_log}
 */
show.head = (args: { request_log: string | number } | [request_log: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show