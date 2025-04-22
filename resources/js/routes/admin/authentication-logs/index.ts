import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::index
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:22
 * @route /api/admin/authentication-logs
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
    url: '\/api\/admin\/authentication-logs',
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::index
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:22
 * @route /api/admin/authentication-logs
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::index
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:22
 * @route /api/admin/authentication-logs
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::index
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:22
 * @route /api/admin/authentication-logs
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const authenticationLogs = {
    index, 
    show,
}

export default authenticationLogs