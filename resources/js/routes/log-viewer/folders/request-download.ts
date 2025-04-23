import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::requestDownload
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:27
 * @route /log-viewer/api/folders/{folderIdentifier}/download/request
 */
export const requestDownload = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: requestDownload.url(args, options),
    method: 'get',
})

requestDownload.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/api\/folders\/{folderIdentifier}\/download\/request',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::requestDownload
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:27
 * @route /log-viewer/api/folders/{folderIdentifier}/download/request
 */
requestDownload.url = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return requestDownload.definition.url
            .replace('{folderIdentifier}', parsedArgs.folderIdentifier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::requestDownload
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:27
 * @route /log-viewer/api/folders/{folderIdentifier}/download/request
 */
requestDownload.get = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: requestDownload.url(args, options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::requestDownload
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:27
 * @route /log-viewer/api/folders/{folderIdentifier}/download/request
 */
requestDownload.head = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: requestDownload.url(args, options),
    method: 'head',
})

export default requestDownload