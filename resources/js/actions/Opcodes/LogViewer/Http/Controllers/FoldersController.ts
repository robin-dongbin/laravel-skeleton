import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:14
 * @route /log-viewer/api/folders
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
    url: '\/log-viewer\/api\/folders',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:14
 * @route /log-viewer/api/folders
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:14
 * @route /log-viewer/api/folders
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:14
 * @route /log-viewer/api/folders
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

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

const FoldersController = { index, requestDownload, clearCache, deleteMethod, download, delete: deleteMethod }

export default FoldersController