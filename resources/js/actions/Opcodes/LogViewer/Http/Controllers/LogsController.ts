import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\LogsController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/LogsController.php:19
 * @route /log-viewer/api/logs
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
    url: '\/log-viewer\/api\/logs',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\LogsController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/LogsController.php:19
 * @route /log-viewer/api/logs
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\LogsController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/LogsController.php:19
 * @route /log-viewer/api/logs
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\LogsController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/LogsController.php:19
 * @route /log-viewer/api/logs
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const LogsController = { index }

export default LogsController