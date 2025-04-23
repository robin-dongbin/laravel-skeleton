import show from './show'
import retry from './retry'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:39
 * @route /horizon/api/batches
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
    url: '\/horizon\/api\/batches',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:39
 * @route /horizon/api/batches
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:39
 * @route /horizon/api/batches
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Laravel\Horizon\Http\Controllers\BatchesController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/BatchesController.php:39
 * @route /horizon/api/batches
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const jobsBatches = {
    index, 
    show, 
    retry,
}

export default jobsBatches