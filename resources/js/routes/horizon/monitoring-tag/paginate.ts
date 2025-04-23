import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::paginate
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:63
 * @route /horizon/api/monitoring/{tag}
 */
export const paginate = (args: { tag: string | number } | [tag: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: paginate.url(args, options),
    method: 'get',
})

paginate.definition = {
    methods: ['get','head'],
    url: '\/horizon\/api\/monitoring\/{tag}',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::paginate
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:63
 * @route /horizon/api/monitoring/{tag}
 */
paginate.url = (args: { tag: string | number } | [tag: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tag: args }
    }

    if (Array.isArray(args)) {
        args = {
            tag: args[0],
        }
    }

    const parsedArgs = {
        tag: args.tag,
    }

    return paginate.definition.url
            .replace('{tag}', parsedArgs.tag.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::paginate
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:63
 * @route /horizon/api/monitoring/{tag}
 */
paginate.get = (args: { tag: string | number } | [tag: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: paginate.url(args, options),
    method: 'get',
})

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::paginate
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:63
 * @route /horizon/api/monitoring/{tag}
 */
paginate.head = (args: { tag: string | number } | [tag: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: paginate.url(args, options),
    method: 'head',
})

export default paginate