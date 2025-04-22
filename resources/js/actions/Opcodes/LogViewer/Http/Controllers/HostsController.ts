import { queryParams, type QueryParams } from './../../../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\HostsController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/HostsController.php:10
 * @route /log-viewer/api/hosts
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
    url: '\/log-viewer\/api\/hosts',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\HostsController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/HostsController.php:10
 * @route /log-viewer/api/hosts
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\HostsController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/HostsController.php:10
 * @route /log-viewer/api/hosts
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\HostsController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/HostsController.php:10
 * @route /log-viewer/api/hosts
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

const HostsController = { index }

export default HostsController