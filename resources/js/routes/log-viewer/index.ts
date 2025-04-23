import hosts from './hosts'
import folders from './folders'
import files from './files'
import logs from './logs'
import { queryParams, type QueryParams, validateParameters } from './../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\IndexController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/IndexController.php:10
 * @route /log-viewer/{view?}
 */
export const index = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/{view?}',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\IndexController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/IndexController.php:10
 * @route /log-viewer/{view?}
 */
index.url = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { view: args }
    }

    if (Array.isArray(args)) {
        args = {
            view: args[0],
        }
    }

    validateParameters(args, [
        "view",
   ])

    const parsedArgs = {
        view: args?.view,
    }

    return index.definition.url
            .replace('{view?}', parsedArgs.view?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\IndexController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/IndexController.php:10
 * @route /log-viewer/{view?}
 */
index.get = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(args, options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\IndexController::index
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/IndexController.php:10
 * @route /log-viewer/{view?}
 */
index.head = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(args, options),
    method: 'head',
})

const logViewer = {
    hosts, 
    folders, 
    files, 
    logs, 
    index,
}

export default logViewer