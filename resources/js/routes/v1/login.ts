import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::login
 * @see app/Http/Controllers/Api/V1/AuthController.php:20
 * @route /api/v1/login
 */
export const login = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ['post'],
    url: '\/api\/v1\/login',
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::login
 * @see app/Http/Controllers/Api/V1/AuthController.php:20
 * @route /api/v1/login
 */
login.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return login.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::login
 * @see app/Http/Controllers/Api/V1/AuthController.php:20
 * @route /api/v1/login
 */
login.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: login.url(options),
    method: 'post',
})

export default login