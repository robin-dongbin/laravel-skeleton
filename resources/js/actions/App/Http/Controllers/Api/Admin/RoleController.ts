import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\RoleController::index
 * @see app/Http/Controllers/Api/Admin/RoleController.php:12
 * @route /api/admin/roles
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
    url: '\/api\/admin\/roles',
}

/**
 * @see \App\Http\Controllers\Api\Admin\RoleController::index
 * @see app/Http/Controllers/Api/Admin/RoleController.php:12
 * @route /api/admin/roles
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\RoleController::index
 * @see app/Http/Controllers/Api/Admin/RoleController.php:12
 * @route /api/admin/roles
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\RoleController::index
 * @see app/Http/Controllers/Api/Admin/RoleController.php:12
 * @route /api/admin/roles
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const RoleController = { index }

export default RoleController