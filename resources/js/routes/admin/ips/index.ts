import store from './store'
import show from './show'
import update from './update'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::index
 * @see app/Http/Controllers/Api/Admin/IpController.php:29
 * @route /api/admin/ips
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
    url: '\/api\/admin\/ips',
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::index
 * @see app/Http/Controllers/Api/Admin/IpController.php:29
 * @route /api/admin/ips
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::index
 * @see app/Http/Controllers/Api/Admin/IpController.php:29
 * @route /api/admin/ips
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::index
 * @see app/Http/Controllers/Api/Admin/IpController.php:29
 * @route /api/admin/ips
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const ips = {
    index, 
    store, 
    show, 
    update, 
    destroy,
}

export default ips