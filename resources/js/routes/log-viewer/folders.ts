import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::folders
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:14
 * @route /log-viewer/api/folders
 */
export const folders = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: folders.url(options),
    method: 'get',
})

folders.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/api\/folders',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::folders
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:14
 * @route /log-viewer/api/folders
 */
folders.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return folders.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::folders
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:14
 * @route /log-viewer/api/folders
 */
folders.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: folders.url(options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\FoldersController::folders
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/FoldersController.php:14
 * @route /log-viewer/api/folders
 */
folders.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: folders.url(options),
    method: 'head',
})

export default folders