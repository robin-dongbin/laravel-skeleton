import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::update
 * @see app/Http/Controllers/Api/Admin/UserController.php:57
 * @route /api/admin/users/{user}
 */
export const update = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/api\/admin\/users\/{user}',
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::update
 * @see app/Http/Controllers/Api/Admin/UserController.php:57
 * @route /api/admin/users/{user}
 */
update.url = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        }
    }

    const parsedArgs = {
        user: typeof args.user === 'object'
            ? args.user.id
            : args.user,
    }

    return update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::update
 * @see app/Http/Controllers/Api/Admin/UserController.php:57
 * @route /api/admin/users/{user}
 */
update.put = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::update
 * @see app/Http/Controllers/Api/Admin/UserController.php:57
 * @route /api/admin/users/{user}
 */
update.patch = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

export default update