import { queryParams, type QueryParams } from './../../../wayfinder'

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

export default deleteMultipleFiles