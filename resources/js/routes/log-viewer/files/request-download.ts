import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::requestDownload
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:26
 * @route /log-viewer/api/files/{fileIdentifier}/download/request
 */
export const requestDownload = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: requestDownload.url(args, options),
    method: 'get',
})

requestDownload.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/api\/files\/{fileIdentifier}\/download\/request',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::requestDownload
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:26
 * @route /log-viewer/api/files/{fileIdentifier}/download/request
 */
requestDownload.url = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return requestDownload.definition.url
            .replace('{fileIdentifier}', parsedArgs.fileIdentifier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::requestDownload
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:26
 * @route /log-viewer/api/files/{fileIdentifier}/download/request
 */
requestDownload.get = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: requestDownload.url(args, options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::requestDownload
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:26
 * @route /log-viewer/api/files/{fileIdentifier}/download/request
 */
requestDownload.head = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: requestDownload.url(args, options),
    method: 'head',
})

export default requestDownload