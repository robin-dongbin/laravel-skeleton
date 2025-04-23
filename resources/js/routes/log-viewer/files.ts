import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::files
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:13
 * @route /log-viewer/api/files
 */
export const files = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: files.url(options),
    method: 'get',
})

files.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/api\/files',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::files
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:13
 * @route /log-viewer/api/files
 */
files.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return files.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::files
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:13
 * @route /log-viewer/api/files
 */
files.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: files.url(options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FilesController::files
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FilesController.php:13
 * @route /log-viewer/api/files
 */
files.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: files.url(options),
    method: 'head',
})

export default files