import { queryParams, type QueryParams } from './../../wayfinder'

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

export default login