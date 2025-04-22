import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserController::show
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserController.php:13
 * @route /api/admin/user
 */
export const show = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/user',
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserController::show
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserController.php:13
 * @route /api/admin/user
 */
show.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return show.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserController::show
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserController.php:13
 * @route /api/admin/user
 */
show.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserController::show
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserController.php:13
 * @route /api/admin/user
 */
show.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(options),
    method: 'head',
})

export default show