import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::register
 * @see app/Http/Controllers/Api/V1/AuthController.php:34
 * @route /api/v1/register
 */
export const register = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ['post'],
    url: '\/api\/v1\/register',
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::register
 * @see app/Http/Controllers/Api/V1/AuthController.php:34
 * @route /api/v1/register
 */
register.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return register.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::register
 * @see app/Http/Controllers/Api/V1/AuthController.php:34
 * @route /api/v1/register
 */
register.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: register.url(options),
    method: 'post',
})

export default register