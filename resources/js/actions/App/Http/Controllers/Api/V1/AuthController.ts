import { queryParams, type QueryParams } from './../../../../../../wayfinder'

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

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::logout
 * @see app/Http/Controllers/Api/V1/AuthController.php:50
 * @route /api/v1/logout
 */
export const logout = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ['post'],
    url: '\/api\/v1\/logout',
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::logout
 * @see app/Http/Controllers/Api/V1/AuthController.php:50
 * @route /api/v1/logout
 */
logout.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return logout.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\V1\AuthController::logout
 * @see app/Http/Controllers/Api/V1/AuthController.php:50
 * @route /api/v1/logout
 */
logout.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: logout.url(options),
    method: 'post',
})

const AuthController = { login, register, logout }

export default AuthController