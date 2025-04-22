import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \Filament\Pages\Auth\Login::Login
 * @see vendor/filament/filament/src/Pages/Auth/Login.php:7
 * @route /filament/login
 */
const Login = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: Login.url(options),
    method: 'get',
})

Login.definition = {
    methods: ['get','head'],
    url: '\/filament\/login',
}

/**
 * @see \Filament\Pages\Auth\Login::Login
 * @see vendor/filament/filament/src/Pages/Auth/Login.php:7
 * @route /filament/login
 */
Login.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return Login.definition.url + queryParams(options)
}

/**
 * @see \Filament\Pages\Auth\Login::Login
 * @see vendor/filament/filament/src/Pages/Auth/Login.php:7
 * @route /filament/login
 */
Login.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: Login.url(options),
    method: 'get',
})

/**
 * @see \Filament\Pages\Auth\Login::Login
 * @see vendor/filament/filament/src/Pages/Auth/Login.php:7
 * @route /filament/login
 */
Login.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: Login.url(options),
    method: 'head',
})

export default Login