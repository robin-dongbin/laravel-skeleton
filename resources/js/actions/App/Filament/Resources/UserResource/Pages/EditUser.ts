import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Filament\Resources\UserResource\Pages\EditUser::EditUser
 * @see app/Filament/Resources/UserResource/Pages/EditUser.php:7
 * @route /filament/users/{record}/edit
 */
const EditUser = (args: { record: string | number } | [record: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: EditUser.url(args, options),
    method: 'get',
})

EditUser.definition = {
    methods: ['get','head'],
    url: '\/filament\/users\/{record}\/edit',
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\EditUser::EditUser
 * @see app/Filament/Resources/UserResource/Pages/EditUser.php:7
 * @route /filament/users/{record}/edit
 */
EditUser.url = (args: { record: string | number } | [record: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { record: args }
    }

    if (Array.isArray(args)) {
        args = {
            record: args[0],
        }
    }

    const parsedArgs = {
        record: args.record,
    }

    return EditUser.definition.url
            .replace('{record}', parsedArgs.record.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Filament\Resources\UserResource\Pages\EditUser::EditUser
 * @see app/Filament/Resources/UserResource/Pages/EditUser.php:7
 * @route /filament/users/{record}/edit
 */
EditUser.get = (args: { record: string | number } | [record: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: EditUser.url(args, options),
    method: 'get',
})

/**
 * @see \App\Filament\Resources\UserResource\Pages\EditUser::EditUser
 * @see app/Filament/Resources/UserResource/Pages/EditUser.php:7
 * @route /filament/users/{record}/edit
 */
EditUser.head = (args: { record: string | number } | [record: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: EditUser.url(args, options),
    method: 'head',
})

export default EditUser