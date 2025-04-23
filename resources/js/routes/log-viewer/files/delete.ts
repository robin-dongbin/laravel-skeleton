import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::deleteMethod
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:72
 * @route /log-viewer/api/files/{fileIdentifier}
 */
export const deleteMethod = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ['delete'],
    url: '\/log-viewer\/api\/files\/{fileIdentifier}',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::deleteMethod
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:72
 * @route /log-viewer/api/files/{fileIdentifier}
 */
deleteMethod.url = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fileIdentifier: args }
    }

    if (Array.isArray(args)) {
        args = {
            fileIdentifier: args[0],
        }
    }

    const parsedArgs = {
        fileIdentifier: args.fileIdentifier,
    }

    return deleteMethod.definition.url
            .replace('{fileIdentifier}', parsedArgs.fileIdentifier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::deleteMethod
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:72
 * @route /log-viewer/api/files/{fileIdentifier}
 */
deleteMethod.delete = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

const deleteRoute = { deleteMethod }

export default deleteRoute