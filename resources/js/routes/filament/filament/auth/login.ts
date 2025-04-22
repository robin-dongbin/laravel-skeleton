import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \Filament\Pages\Auth\Login::login
 * @see vendor/filament/filament/src/Pages/Auth/Login.php:7
 * @route /filament/login
 */
export const login = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ['get','head'],
    url: '\/filament\/login',
}

/**
 * @see \Filament\Pages\Auth\Login::login
 * @see vendor/filament/filament/src/Pages/Auth/Login.php:7
 * @route /filament/login
 */
login.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return login.definition.url + queryParams(options)
}

/**
 * @see \Filament\Pages\Auth\Login::login
 * @see vendor/filament/filament/src/Pages/Auth/Login.php:7
 * @route /filament/login
 */
login.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: login.url(options),
    method: 'get',
})

/**
 * @see \Filament\Pages\Auth\Login::login
 * @see vendor/filament/filament/src/Pages/Auth/Login.php:7
 * @route /filament/login
 */
login.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: login.url(options),
    method: 'head',
})

export default login