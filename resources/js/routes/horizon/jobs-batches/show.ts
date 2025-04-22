import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::show
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:58
 * @route /horizon/api/batches/{id}
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
    url: '\/horizon\/api\/batches\/{id}',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::show
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:58
 * @route /horizon/api/batches/{id}
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
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::show
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:58
 * @route /horizon/api/batches/{id}
 */
show.get = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::show
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:58
 * @route /horizon/api/batches/{id}
 */
show.head = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

export default show