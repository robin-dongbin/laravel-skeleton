import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\V1\AuthenticatedUserPasswordController::update
 * @see app/Http/Controllers/Api/V1/AuthenticatedUserPasswordController.php:14
 * @route /api/v1/user/password
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
    url: '\/api\/v1\/user\/password',
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthenticatedUserPasswordController::update
 * @see app/Http/Controllers/Api/V1/AuthenticatedUserPasswordController.php:14
 * @route /api/v1/user/password
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthenticatedUserPasswordController::update
 * @see app/Http/Controllers/Api/V1/AuthenticatedUserPasswordController.php:14
 * @route /api/v1/user/password
 */
update.patch = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(options),
    method: 'patch',
})

const AuthenticatedUserPasswordController = { update }

export default AuthenticatedUserPasswordController