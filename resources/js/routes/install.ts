import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see \App\Http\Controllers\InstallController::install
 * @see app/Http/Controllers/InstallController.php:12
 * @route /install
 */
export const install = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: install.url(options),
    method: 'get',
})

install.definition = {
    methods: ['get','head'],
    url: '\/install',
}

/**
 * @see \App\Http\Controllers\InstallController::install
 * @see app/Http/Controllers/InstallController.php:12
 * @route /install
 */
install.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return install.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\InstallController::install
 * @see app/Http/Controllers/InstallController.php:12
 * @route /install
 */
install.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: install.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\InstallController::install
 * @see app/Http/Controllers/InstallController.php:12
 * @route /install
 */
install.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: install.url(options),
    method: 'head',
})

export default install