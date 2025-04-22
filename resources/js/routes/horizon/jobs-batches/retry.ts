import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::retry
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:79
 * @route /horizon/api/batches/retry/{id}
 */
export const retry = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: retry.url(args, options),
    method: 'post',
})

retry.definition = {
    methods: ['post'],
    url: '\/horizon\/api\/batches\/retry\/{id}',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::retry
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:79
 * @route /horizon/api/batches/retry/{id}
 */
retry.url = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return retry.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::retry
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:79
 * @route /horizon/api/batches/retry/{id}
 */
retry.post = (args: { id: string | number } | [id: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: retry.url(args, options),
    method: 'post',
})

export default retry