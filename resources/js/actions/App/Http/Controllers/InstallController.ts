import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\InstallController::InstallController
 * @see app/Http/Controllers/InstallController.php:12
 * @route /install
 */
const InstallController = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: InstallController.url(options),
    method: 'get',
})

InstallController.definition = {
    methods: ['get','head'],
    url: '\/install',
}

/**
 * @see \App\Http\Controllers\InstallController::InstallController
 * @see app/Http/Controllers/InstallController.php:12
 * @route /install
 */
InstallController.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return InstallController.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\InstallController::InstallController
 * @see app/Http/Controllers/InstallController.php:12
 * @route /install
 */
InstallController.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: InstallController.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\InstallController::InstallController
 * @see app/Http/Controllers/InstallController.php:12
 * @route /install
 */
InstallController.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: InstallController.url(options),
    method: 'head',
})

export default InstallController