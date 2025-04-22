import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\AuthController::login
 * @see app/Http/Controllers/Api/Admin/AuthController.php:16
 * @route /api/admin/login
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
    url: '\/api\/admin\/login',
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthController::login
 * @see app/Http/Controllers/Api/Admin/AuthController.php:16
 * @route /api/admin/login
 */
login.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return login.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthController::login
 * @see app/Http/Controllers/Api/Admin/AuthController.php:16
 * @route /api/admin/login
 */
login.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: login.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\Api\Admin\AuthController::logout
 * @see app/Http/Controllers/Api/Admin/AuthController.php:27
 * @route /api/admin/logout
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
    url: '\/api\/admin\/logout',
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthController::logout
 * @see app/Http/Controllers/Api/Admin/AuthController.php:27
 * @route /api/admin/logout
 */
logout.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return logout.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthController::logout
 * @see app/Http/Controllers/Api/Admin/AuthController.php:27
 * @route /api/admin/logout
 */
logout.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: logout.url(options),
    method: 'post',
})

const AuthController = { login, logout }

export default AuthController