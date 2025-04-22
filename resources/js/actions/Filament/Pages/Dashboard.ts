import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Filament\Pages\Dashboard::Dashboard
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route /filament
 */
const Dashboard = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: Dashboard.url(options),
    method: 'get',
})

Dashboard.definition = {
    methods: ['get','head'],
    url: '\/filament',
}

/**
 * @see \Filament\Pages\Dashboard::Dashboard
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route /filament
 */
Dashboard.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return Dashboard.definition.url + queryParams(options)
}

/**
 * @see \Filament\Pages\Dashboard::Dashboard
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route /filament
 */
Dashboard.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: Dashboard.url(options),
    method: 'get',
})

/**
 * @see \Filament\Pages\Dashboard::Dashboard
 * @see vendor/filament/filament/src/Pages/Dashboard.php:7
 * @route /filament
 */
Dashboard.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: Dashboard.url(options),
    method: 'head',
})

export default Dashboard