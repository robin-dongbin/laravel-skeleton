import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::store
 * @see app/Http/Controllers/Api/Admin/IpController.php:44
 * @route /api/admin/ips
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/api\/admin\/ips',
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::store
 * @see app/Http/Controllers/Api/Admin/IpController.php:44
 * @route /api/admin/ips
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::store
 * @see app/Http/Controllers/Api/Admin/IpController.php:44
 * @route /api/admin/ips
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

export default store