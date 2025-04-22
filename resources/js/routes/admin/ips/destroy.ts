import { queryParams, type QueryParams } from './../../../wayfinder'

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

export default destroy