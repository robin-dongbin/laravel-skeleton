import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Filament\Resources\UserResource\Pages\CreateUser::create
 * @see app/Filament/Resources/UserResource/Pages/CreateUser.php:7
 * @route /filament/users/create
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '\/filament\/users\/create',
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\CreateUser::create
 * @see app/Filament/Resources/UserResource/Pages/CreateUser.php:7
 * @route /filament/users/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\CreateUser::create
 * @see app/Filament/Resources/UserResource/Pages/CreateUser.php:7
 * @route /filament/users/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Filament\Resources\UserResource\Pages\CreateUser::create
 * @see app/Filament/Resources/UserResource/Pages/CreateUser.php:7
 * @route /filament/users/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})

export default create