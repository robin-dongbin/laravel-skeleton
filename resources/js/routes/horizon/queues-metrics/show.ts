import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\QueueMetricsController::show
 * @see vendor/laravel/horizon/src/Http/Controllers/QueueMetricsController.php:45
 * @route /horizon/api/metrics/queues/{id}
 */
export const show = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/horizon\/api\/metrics\/queues\/{id}',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\QueueMetricsController::show
 * @see vendor/laravel/horizon/src/Http/Controllers/QueueMetricsController.php:45
 * @route /horizon/api/metrics/queues/{id}
 */
show.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\QueueMetricsController::show
 * @see vendor/laravel/horizon/src/Http/Controllers/QueueMetricsController.php:45
 * @route /horizon/api/metrics/queues/{id}
 */
show.get = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \Laravel\Horizon\Http\Controllers\QueueMetricsController::show
 * @see vendor/laravel/horizon/src/Http/Controllers/QueueMetricsController.php:45
 * @route /horizon/api/metrics/queues/{id}
 */
show.head = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show