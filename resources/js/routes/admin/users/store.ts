import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::store
 * @see app/Http/Controllers/Api/Admin/UserController.php:47
 * @route /api/admin/users
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/api\/admin\/users',
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::store
 * @see app/Http/Controllers/Api/Admin/UserController.php:47
 * @route /api/admin/users
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::store
 * @see app/Http/Controllers/Api/Admin/UserController.php:47
 * @route /api/admin/users
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

export default store