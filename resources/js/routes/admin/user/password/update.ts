import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserPasswordController::update
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserPasswordController.php:14
 * @route /api/admin/user/password
 */
export const update = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ['patch'],
    url: '\/api\/admin\/user\/password',
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserPasswordController::update
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserPasswordController.php:14
 * @route /api/admin/user/password
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticatedUserPasswordController::update
 * @see app/Http/Controllers/Api/Admin/AuthenticatedUserPasswordController.php:14
 * @route /api/admin/user/password
 */
update.patch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(options),
    method: 'patch',
})

export default update