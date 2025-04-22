import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:13
 * @route /log-viewer/api/files
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
    url: '\/log-viewer\/api\/files',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:13
 * @route /log-viewer/api/files
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:13
 * @route /log-viewer/api/files
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:13
 * @route /log-viewer/api/files
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

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

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::clearCacheAll
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:63
 * @route /log-viewer/api/clear-cache-all
 */
export const clearCacheAll = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clearCacheAll.url(options),
    method: 'post',
})

clearCacheAll.definition = {
    methods: ['post'],
    url: '\/log-viewer\/api\/clear-cache-all',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::clearCacheAll
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:63
 * @route /log-viewer/api/clear-cache-all
 */
clearCacheAll.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return clearCacheAll.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::clearCacheAll
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:63
 * @route /log-viewer/api/clear-cache-all
 */
clearCacheAll.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: clearCacheAll.url(options),
    method: 'post',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::deleteMultipleFiles
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:89
 * @route /log-viewer/api/delete-multiple-files
 */
export const deleteMultipleFiles = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: deleteMultipleFiles.url(options),
    method: 'post',
})

deleteMultipleFiles.definition = {
    methods: ['post'],
    url: '\/log-viewer\/api\/delete-multiple-files',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::deleteMultipleFiles
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:89
 * @route /log-viewer/api/delete-multiple-files
 */
deleteMultipleFiles.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return deleteMultipleFiles.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::deleteMultipleFiles
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:89
 * @route /log-viewer/api/delete-multiple-files
 */
deleteMultipleFiles.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: deleteMultipleFiles.url(options),
    method: 'post',
})

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

const FilesController = { index, requestDownload, clearCache, deleteMethod, clearCacheAll, deleteMultipleFiles, download, delete: deleteMethod }

export default FilesController