import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\RequestLogController::index
 * @see app/Http/Controllers/Api/Admin/RequestLogController.php:22
 * @route /api/admin/request-logs
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/request-logs',
}

/**
 * @see \App\Http\Controllers\Api\Admin\RequestLogController::index
 * @see app/Http/Controllers/Api/Admin/RequestLogController.php:22
 * @route /api/admin/request-logs
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\RequestLogController::index
 * @see app/Http/Controllers/Api/Admin/RequestLogController.php:22
 * @route /api/admin/request-logs
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\RequestLogController::index
 * @see app/Http/Controllers/Api/Admin/RequestLogController.php:22
 * @route /api/admin/request-logs
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const requestLogs = {
    index, 
    show,
}

export default requestLogs