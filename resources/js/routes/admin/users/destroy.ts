import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::destroy
 * @see app/Http/Controllers/Api/Admin/UserController.php:72
 * @route /api/admin/users/{user}
 */
export const destroy = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/api\/admin\/users\/{user}',
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::destroy
 * @see app/Http/Controllers/Api/Admin/UserController.php:72
 * @route /api/admin/users/{user}
 */
destroy.url = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::destroy
 * @see app/Http/Controllers/Api/Admin/UserController.php:72
 * @route /api/admin/users/{user}
 */
destroy.delete = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

export default destroy