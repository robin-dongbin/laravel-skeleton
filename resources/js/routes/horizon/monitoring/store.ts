import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::store
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:100
 * @route /horizon/api/monitoring
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/horizon\/api\/monitoring',
}

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::store
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:100
 * @route /horizon/api/monitoring
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \Laravel\Horizon\Http\Controllers\MonitoringController::store
 * @see vendor/laravel/horizon/src/Http/Controllers/MonitoringController.php:100
 * @route /horizon/api/monitoring
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

export default store