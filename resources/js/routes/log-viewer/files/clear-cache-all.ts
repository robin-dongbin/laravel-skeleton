import { queryParams, type QueryParams } from './../../../wayfinder'

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

export default clearCacheAll