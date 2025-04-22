import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\DashboardController::DashboardController
 * @see app/Http/Controllers/Api/Admin/DashboardController.php:10
 * @route /api/admin/dashboard
 */
const DashboardController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: DashboardController.url(options),
    method: 'get',
})

DashboardController.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/dashboard',
}

/**
 * @see \App\Http\Controllers\Api\Admin\DashboardController::DashboardController
 * @see app/Http/Controllers/Api/Admin/DashboardController.php:10
 * @route /api/admin/dashboard
 */
DashboardController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return DashboardController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\DashboardController::DashboardController
 * @see app/Http/Controllers/Api/Admin/DashboardController.php:10
 * @route /api/admin/dashboard
 */
DashboardController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: DashboardController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\DashboardController::DashboardController
 * @see app/Http/Controllers/Api/Admin/DashboardController.php:10
 * @route /api/admin/dashboard
 */
DashboardController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: DashboardController.url(options),
    method: 'head',
})

export default DashboardController