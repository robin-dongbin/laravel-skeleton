import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\LogsController::logs
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/LogsController.php:19
 * @route /log-viewer/api/logs
 */
export const logs = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: logs.url(options),
    method: 'get',
})

logs.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/api\/logs',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\LogsController::logs
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/LogsController.php:19
 * @route /log-viewer/api/logs
 */
logs.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return logs.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\LogsController::logs
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/LogsController.php:19
 * @route /log-viewer/api/logs
 */
logs.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: logs.url(options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\LogsController::logs
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/LogsController.php:19
 * @route /log-viewer/api/logs
 */
logs.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: logs.url(options),
    method: 'head',
})

export default logs