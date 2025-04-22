import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::index
 * @see app/Http/Controllers/Api/Admin/IpController.php:29
 * @route /api/admin/ips
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
    url: '\/api\/admin\/ips',
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::index
 * @see app/Http/Controllers/Api/Admin/IpController.php:29
 * @route /api/admin/ips
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::index
 * @see app/Http/Controllers/Api/Admin/IpController.php:29
 * @route /api/admin/ips
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::index
 * @see app/Http/Controllers/Api/Admin/IpController.php:29
 * @route /api/admin/ips
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::store
 * @see app/Http/Controllers/Api/Admin/IpController.php:44
 * @route /api/admin/ips
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
    url: '\/api\/admin\/ips',
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::store
 * @see app/Http/Controllers/Api/Admin/IpController.php:44
 * @route /api/admin/ips
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::store
 * @see app/Http/Controllers/Api/Admin/IpController.php:44
 * @route /api/admin/ips
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::show
 * @see app/Http/Controllers/Api/Admin/IpController.php:51
 * @route /api/admin/ips/{ip}
 */
export const show = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/ips\/{ip}',
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::show
 * @see app/Http/Controllers/Api/Admin/IpController.php:51
 * @route /api/admin/ips/{ip}
 */
show.url = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ip: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ip: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ip: args[0],
        }
    }

    const parsedArgs = {
        ip: typeof args.ip === 'object'
            ? args.ip.id
            : args.ip,
    }

    return show.definition.url
            .replace('{ip}', parsedArgs.ip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::show
 * @see app/Http/Controllers/Api/Admin/IpController.php:51
 * @route /api/admin/ips/{ip}
 */
show.get = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::show
 * @see app/Http/Controllers/Api/Admin/IpController.php:51
 * @route /api/admin/ips/{ip}
 */
show.head = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::update
 * @see app/Http/Controllers/Api/Admin/IpController.php:56
 * @route /api/admin/ips/{ip}
 */
export const update = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ['put','patch'],
    url: '\/api\/admin\/ips\/{ip}',
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::update
 * @see app/Http/Controllers/Api/Admin/IpController.php:56
 * @route /api/admin/ips/{ip}
 */
update.url = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ip: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ip: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ip: args[0],
        }
    }

    const parsedArgs = {
        ip: typeof args.ip === 'object'
            ? args.ip.id
            : args.ip,
    }

    return update.definition.url
            .replace('{ip}', parsedArgs.ip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::update
 * @see app/Http/Controllers/Api/Admin/IpController.php:56
 * @route /api/admin/ips/{ip}
 */
update.put = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: update.url(args, options),
    method: 'put',
})

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::update
 * @see app/Http/Controllers/Api/Admin/IpController.php:56
 * @route /api/admin/ips/{ip}
 */
update.patch = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'patch',
} => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::destroy
 * @see app/Http/Controllers/Api/Admin/IpController.php:63
 * @route /api/admin/ips/{ip}
 */
export const destroy = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/api\/admin\/ips\/{ip}',
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::destroy
 * @see app/Http/Controllers/Api/Admin/IpController.php:63
 * @route /api/admin/ips/{ip}
 */
destroy.url = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ip: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ip: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ip: args[0],
        }
    }

    const parsedArgs = {
        ip: typeof args.ip === 'object'
            ? args.ip.id
            : args.ip,
    }

    return destroy.definition.url
            .replace('{ip}', parsedArgs.ip.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\IpController::destroy
 * @see app/Http/Controllers/Api/Admin/IpController.php:63
 * @route /api/admin/ips/{ip}
 */
destroy.delete = (args: { ip: number | { id: number } } | [ip: number | { id: number }] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const IpController = { index, store, show, update, destroy }

export default IpController