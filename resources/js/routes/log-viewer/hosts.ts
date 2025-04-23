import { queryParams, type QueryParams } from './../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\HostsController::hosts
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/HostsController.php:10
 * @route /log-viewer/api/hosts
 */
export const hosts = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: hosts.url(options),
    method: 'get',
})

hosts.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/api\/hosts',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\HostsController::hosts
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/HostsController.php:10
 * @route /log-viewer/api/hosts
 */
hosts.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return hosts.definition.url + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\HostsController::hosts
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/HostsController.php:10
 * @route /log-viewer/api/hosts
 */
hosts.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: hosts.url(options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\HostsController::hosts
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/HostsController.php:10
 * @route /log-viewer/api/hosts
 */
hosts.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: hosts.url(options),
    method: 'head',
})

export default hosts