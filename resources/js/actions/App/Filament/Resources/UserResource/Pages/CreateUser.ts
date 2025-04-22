import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Filament\Resources\UserResource\Pages\CreateUser::CreateUser
 * @see app/Filament/Resources/UserResource/Pages/CreateUser.php:7
 * @route /filament/users/create
 */
const CreateUser = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: CreateUser.url(options),
    method: 'get',
})

CreateUser.definition = {
    methods: ['get','head'],
    url: '\/filament\/users\/create',
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\CreateUser::CreateUser
 * @see app/Filament/Resources/UserResource/Pages/CreateUser.php:7
 * @route /filament/users/create
 */
CreateUser.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return CreateUser.definition.url + queryParams(options)
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\CreateUser::CreateUser
 * @see app/Filament/Resources/UserResource/Pages/CreateUser.php:7
 * @route /filament/users/create
 */
CreateUser.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: CreateUser.url(options),
    method: 'get',
})

/**
 * @see \App\Filament\Resources\UserResource\Pages\CreateUser::CreateUser
 * @see app/Filament/Resources/UserResource/Pages/CreateUser.php:7
 * @route /filament/users/create
 */
CreateUser.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: CreateUser.url(options),
    method: 'head',
})

export default CreateUser