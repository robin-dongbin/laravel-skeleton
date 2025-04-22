import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::download
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:44
 * @route /log-viewer/api/folders/{folderIdentifier}/download
 */
export const download = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/api\/folders\/{folderIdentifier}\/download',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::download
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:44
 * @route /log-viewer/api/folders/{folderIdentifier}/download
 */
download.url = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return download.definition.url
            .replace('{folderIdentifier}', parsedArgs.folderIdentifier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::download
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:44
 * @route /log-viewer/api/folders/{folderIdentifier}/download
 */
download.get = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: download.url(args, options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::download
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:44
 * @route /log-viewer/api/folders/{folderIdentifier}/download
 */
download.head = (args: { folderIdentifier: string | number } | [folderIdentifier: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: download.url(args, options),
    method: 'head',
})

export default download