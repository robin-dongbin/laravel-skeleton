import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\V1\AuthenticatedUserController::update
 * @see app/Http/Controllers/Api/V1/AuthenticatedUserController.php:20
 * @route /api/v1/user
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
    url: '\/api\/v1\/user',
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthenticatedUserController::update
 * @see app/Http/Controllers/Api/V1/AuthenticatedUserController.php:20
 * @route /api/v1/user
 */
update.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return update.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthenticatedUserController::update
 * @see app/Http/Controllers/Api/V1/AuthenticatedUserController.php:20
 * @route /api/v1/user
 */
update.put = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(options),
    method: 'put',
})

export default update