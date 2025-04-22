import { queryParams, type QueryParams, validateParameters } from './../../../../../wayfinder'

/**
 * @see \Opcodes\LogViewer\Http\Controllers\IndexController::IndexController
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/IndexController.php:10
 * @route /log-viewer/{view?}
 */
const IndexController = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: IndexController.url(args, options),
    method: 'get',
})

IndexController.definition = {
    methods: ['get','head'],
    url: '\/log-viewer\/{view?}',
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\IndexController::IndexController
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/IndexController.php:10
 * @route /log-viewer/{view?}
 */
IndexController.url = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return IndexController.definition.url
            .replace('{view?}', parsedArgs.view?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Opcodes\LogViewer\Http\Controllers\IndexController::IndexController
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/IndexController.php:10
 * @route /log-viewer/{view?}
 */
IndexController.get = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: IndexController.url(args, options),
    method: 'get',
})

/**
 * @see \Opcodes\LogViewer\Http\Controllers\IndexController::IndexController
 * @see vendor/opcodesio/log-viewer/src/Http/Controllers/IndexController.php:10
 * @route /log-viewer/{view?}
 */
IndexController.head = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: IndexController.url(args, options),
    method: 'head',
})

export default IndexController