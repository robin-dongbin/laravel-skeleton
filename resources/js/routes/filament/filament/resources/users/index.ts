import create from './create'
import edit from './edit'
import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \App\Filament\Resources\UserResource\Pages\ListUsers::index
 * @see app/Filament/Resources/UserResource/Pages/ListUsers.php:7
 * @route /filament/users
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/filament\/users',
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\ListUsers::index
 * @see app/Filament/Resources/UserResource/Pages/ListUsers.php:7
 * @route /filament/users
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\ListUsers::index
 * @see app/Filament/Resources/UserResource/Pages/ListUsers.php:7
 * @route /filament/users
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Filament\Resources\UserResource\Pages\ListUsers::index
 * @see app/Filament/Resources/UserResource/Pages/ListUsers.php:7
 * @route /filament/users
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const users = {
    index, 
    create, 
    edit,
}

export default users