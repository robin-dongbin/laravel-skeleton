import { queryParams, type QueryParams } from './../../../wayfinder'

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

export default show