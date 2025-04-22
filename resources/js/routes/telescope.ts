import { queryParams, type QueryParams, validateParameters } from './../wayfinder'

/**
 * @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
 * @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
 * @route /telescope/{view?}
 */
export const telescope = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: telescope.url(args, options),
    method: 'get',
})

telescope.definition = {
    methods: ['get','head'],
    url: '\/telescope\/{view?}',
}

/**
 * @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
 * @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
 * @route /telescope/{view?}
 */
telescope.url = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return telescope.definition.url
            .replace('{view?}', parsedArgs.view?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
 * @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
 * @route /telescope/{view?}
 */
telescope.get = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: telescope.url(args, options),
    method: 'get',
})

/**
 * @see \Laravel\Telescope\Http\Controllers\HomeController::telescope
 * @see vendor/laravel/telescope/src/Http/Controllers/HomeController.php:15
 * @route /telescope/{view?}
 */
telescope.head = (args?: { view?: string | number } | [view: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: telescope.url(args, options),
    method: 'head',
})

export default telescope