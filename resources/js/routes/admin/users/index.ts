import store from './store'
import show from './show'
import update from './update'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::index
 * @see app/Http/Controllers/Api/Admin/UserController.php:28
 * @route /api/admin/users
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/users',
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::index
 * @see app/Http/Controllers/Api/Admin/UserController.php:28
 * @route /api/admin/users
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::index
 * @see app/Http/Controllers/Api/Admin/UserController.php:28
 * @route /api/admin/users
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::index
 * @see app/Http/Controllers/Api/Admin/UserController.php:28
 * @route /api/admin/users
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const users = {
    index, 
    store, 
    show, 
    update, 
    destroy,
}

export default users