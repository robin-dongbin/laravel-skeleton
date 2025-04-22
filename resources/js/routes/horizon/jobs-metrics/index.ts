import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\JobMetricsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/JobMetricsController.php:34
 * @route /horizon/api/metrics/jobs
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
    url: '\/horizon\/api\/metrics\/jobs',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\JobMetricsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/JobMetricsController.php:34
 * @route /horizon/api/metrics/jobs
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\JobMetricsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/JobMetricsController.php:34
 * @route /horizon/api/metrics/jobs
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Laravel\Horizon\Http\Controllers\JobMetricsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/JobMetricsController.php:34
 * @route /horizon/api/metrics/jobs
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const jobsMetrics = {
    index, 
    show,
}

export default jobsMetrics