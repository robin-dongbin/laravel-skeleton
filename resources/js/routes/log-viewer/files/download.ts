import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::download
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:43
 * @route /log-viewer/api/files/{fileIdentifier}/download
 */
export const download = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/api\/files\/{fileIdentifier}\/download',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::download
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:43
 * @route /log-viewer/api/files/{fileIdentifier}/download
 */
download.url = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return download.definition.url
            .replace('{fileIdentifier}', parsedArgs.fileIdentifier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::download
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:43
 * @route /log-viewer/api/files/{fileIdentifier}/download
 */
download.get = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: download.url(args, options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::download
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:43
 * @route /log-viewer/api/files/{fileIdentifier}/download
 */
download.head = (args: { fileIdentifier: string | number } | [fileIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: download.url(args, options),
    method: 'head',
})

export default download