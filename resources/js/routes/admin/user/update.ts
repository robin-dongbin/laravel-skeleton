import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserController::update
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserController.php:20
 * @route /api/admin/user
 */
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ['put'],
    url: '\/api\/admin\/user',
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserController::update
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserController.php:20
 * @route /api/admin/user
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserController::update
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserController.php:20
 * @route /api/admin/user
 */
update.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})

export default update