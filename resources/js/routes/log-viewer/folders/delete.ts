import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::deleteMethod
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:62
 * @route /log-viewer/api/folders/{folderIdentifier}
 */
export const deleteMethod = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ['delete'],
    url: '\/log-viewer\/api\/folders\/{folderIdentifier}',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::deleteMethod
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:62
 * @route /log-viewer/api/folders/{folderIdentifier}
 */
deleteMethod.url = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { folderIdentifier: args }
    }

    if (Array.isArray(args)) {
        args = {
            folderIdentifier: args[0],
        }
    }

    const parsedArgs = {
        folderIdentifier: args.folderIdentifier,
    }

    return deleteMethod.definition.url
            .replace('{folderIdentifier}', parsedArgs.folderIdentifier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::deleteMethod
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:62
 * @route /log-viewer/api/folders/{folderIdentifier}
 */
deleteMethod.delete = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

const deleteRoute = { deleteMethod }

export default deleteRoute