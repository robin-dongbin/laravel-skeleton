import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\FailedJobsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/FailedJobsController.php:46
 * @route /horizon/api/jobs/failed
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
    url: '\/horizon\/api\/jobs\/failed',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\FailedJobsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/FailedJobsController.php:46
 * @route /horizon/api/jobs/failed
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\FailedJobsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/FailedJobsController.php:46
 * @route /horizon/api/jobs/failed
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Laravel\Horizon\Http\Controllers\FailedJobsController::index
 * @see vendor/laravel/horizon/src/Http/Controllers/FailedJobsController.php:46
 * @route /horizon/api/jobs/failed
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const failedJobs = {
    index, 
    show,
}

export default failedJobs