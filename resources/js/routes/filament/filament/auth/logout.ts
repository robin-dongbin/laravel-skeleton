import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \Filament\Http\Controllers\Auth\LogoutController::logout
 * @see vendor/filament/filament/src/Http/Controllers/Auth/LogoutController.php:10
 * @route /filament/logout
 */
export const logout = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ['post'],
    url: '\/filament\/logout',
}

/**
 * @see \Filament\Http\Controllers\Auth\LogoutController::logout
 * @see vendor/filament/filament/src/Http/Controllers/Auth/LogoutController.php:10
 * @route /filament/logout
 */
logout.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return logout.definition.url + queryParams(options)
}

/**
 * @see \Filament\Http\Controllers\Auth\LogoutController::logout
 * @see vendor/filament/filament/src/Http/Controllers/Auth/LogoutController.php:10
 * @route /filament/logout
 */
logout.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: logout.url(options),
    method: 'post',
})

export default logout