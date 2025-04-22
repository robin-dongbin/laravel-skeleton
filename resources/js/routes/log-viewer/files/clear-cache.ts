import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::clearCache
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:50
 * @route /log-viewer/api/files/{fileIdentifier}/clear-cache
 */
export const clearCache = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clearCache.url(args, options),
    method: 'post',
})

clearCache.definition = {
    methods: ['post'],
    url: '\/log-viewer\/api\/files\/{fileIdentifier}\/clear-cache',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::clearCache
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:50
 * @route /log-viewer/api/files/{fileIdentifier}/clear-cache
 */
clearCache.url = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return clearCache.definition.url
            .replace('{fileIdentifier}', parsedArgs.fileIdentifier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::clearCache
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:50
 * @route /log-viewer/api/files/{fileIdentifier}/clear-cache
 */
clearCache.post = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clearCache.url(args, options),
    method: 'post',
})

export default clearCache