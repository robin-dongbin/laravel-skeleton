import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Filament\Resources\UserResource\Pages\ListUsers::ListUsers
 * @see app/Filament/Resources/UserResource/Pages/ListUsers.php:7
 * @route /filament/users
 */
const ListUsers = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ListUsers.url(options),
    method: 'get',
})

ListUsers.definition = {
    methods: ['get','head'],
    url: '\/filament\/users',
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\ListUsers::ListUsers
 * @see app/Filament/Resources/UserResource/Pages/ListUsers.php:7
 * @route /filament/users
 */
ListUsers.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return ListUsers.definition.url + queryParams(options)
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\ListUsers::ListUsers
 * @see app/Filament/Resources/UserResource/Pages/ListUsers.php:7
 * @route /filament/users
 */
ListUsers.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ListUsers.url(options),
    method: 'get',
})

/**
 * @see \App\Filament\Resources\UserResource\Pages\ListUsers::ListUsers
 * @see app/Filament/Resources/UserResource/Pages/ListUsers.php:7
 * @route /filament/users
 */
ListUsers.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: ListUsers.url(options),
    method: 'head',
})

export default ListUsers