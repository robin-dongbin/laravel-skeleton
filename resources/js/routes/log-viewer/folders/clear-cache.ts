import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::clearCache
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:51
 * @route /log-viewer/api/folders/{folderIdentifier}/clear-cache
 */
export const clearCache = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clearCache.url(args, options),
    method: 'post',
})

clearCache.definition = {
    methods: ['post'],
    url: '\/log-viewer\/api\/folders\/{folderIdentifier}\/clear-cache',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::clearCache
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:51
 * @route /log-viewer/api/folders/{folderIdentifier}/clear-cache
 */
clearCache.url = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return clearCache.definition.url
            .replace('{folderIdentifier}', parsedArgs.folderIdentifier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::clearCache
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:51
 * @route /log-viewer/api/folders/{folderIdentifier}/clear-cache
 */
clearCache.post = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clearCache.url(args, options),
    method: 'post',
})

export default clearCache