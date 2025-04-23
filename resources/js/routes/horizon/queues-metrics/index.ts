import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\QueueMetricsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/QueueMetricsController.php:34
 * @route /horizon/api/metrics/queues
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
    url: '\/horizon\/api\/metrics\/queues',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\QueueMetricsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/QueueMetricsController.php:34
 * @route /horizon/api/metrics/queues
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\QueueMetricsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/QueueMetricsController.php:34
 * @route /horizon/api/metrics/queues
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Laravel\Horizon\Http\Controllers\QueueMetricsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/QueueMetricsController.php:34
 * @route /horizon/api/metrics/queues
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const queuesMetrics = {
    index, 
    show,
}

export default queuesMetrics