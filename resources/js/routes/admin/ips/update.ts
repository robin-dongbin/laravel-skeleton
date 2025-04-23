import { queryParams, type QueryParams } from './../../../wayfinder'

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

export default update