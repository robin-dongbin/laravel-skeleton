import { queryParams, type QueryParams } from './../../../../../../wayfinder'

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

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::store
 * @see app/Http/Controllers/Api/Admin/UserController.php:45
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
 * @see app/Http/Controllers/Api/Admin/UserController.php:45
 * @route /api/admin/users
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::store
 * @see app/Http/Controllers/Api/Admin/UserController.php:45
 * @route /api/admin/users
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::show
 * @see app/Http/Controllers/Api/Admin/UserController.php:52
 * @route /api/admin/users/{user}
 */
export const show = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/users\/{user}',
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::show
 * @see app/Http/Controllers/Api/Admin/UserController.php:52
 * @route /api/admin/users/{user}
 */
show.url = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::show
 * @see app/Http/Controllers/Api/Admin/UserController.php:52
 * @route /api/admin/users/{user}
 */
show.get = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::show
 * @see app/Http/Controllers/Api/Admin/UserController.php:52
 * @route /api/admin/users/{user}
 */
show.head = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

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

/**
 * @see \App\Http\Controllers\Api\Admin\UserController::destroy
 * @see app/Http/Controllers/Api/Admin/UserController.php:70
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
 * @see app/Http/Controllers/Api/Admin/UserController.php:70
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
 * @see app/Http/Controllers/Api/Admin/UserController.php:70
 * @route /api/admin/users/{user}
 */
destroy.delete = (args: { user: number | { id: number } } | [user: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const UserController = { index, store, show, update, destroy }

export default UserController