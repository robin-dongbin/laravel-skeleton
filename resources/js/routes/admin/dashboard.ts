import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Api/Admin/DashboardController.php:10
 * @route /api/admin/dashboard
 */
export const dashboard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/dashboard',
}

/**
 * @see \App\Http\Controllers\Api\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Api/Admin/DashboardController.php:10
 * @route /api/admin/dashboard
 */
dashboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Api/Admin/DashboardController.php:10
 * @route /api/admin/dashboard
 */
dashboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Api/Admin/DashboardController.php:10
 * @route /api/admin/dashboard
 */
dashboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: dashboard.url(options),
    method: 'head',
})

export default dashboard