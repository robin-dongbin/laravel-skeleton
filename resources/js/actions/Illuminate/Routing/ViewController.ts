import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \Illuminate\Routing\ViewController::ViewController
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route /21232f297a57a5a743894a0e4a801fc3{any}
 */
const ViewController = (args: { any: string | number } | [any: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ViewController.url(args, options),
    method: 'get',
})

ViewController.definition = {
    methods: ['get','head'],
    url: '\/21232f297a57a5a743894a0e4a801fc3{any}',
}

/**
 * @see \Illuminate\Routing\ViewController::ViewController
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route /21232f297a57a5a743894a0e4a801fc3{any}
 */
ViewController.url = (args: { any: string | number } | [any: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { any: args }
    }

    if (Array.isArray(args)) {
        args = {
            any: args[0],
        }
    }

    const parsedArgs = {
        any: args.any,
    }

    return ViewController.definition.url
            .replace('{any}', parsedArgs.any.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \Illuminate\Routing\ViewController::ViewController
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route /21232f297a57a5a743894a0e4a801fc3{any}
 */
ViewController.get = (args: { any: string | number } | [any: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ViewController.url(args, options),
    method: 'get',
})

/**
 * @see \Illuminate\Routing\ViewController::ViewController
 * @see vendor/laravel/framework/src/Illuminate/Routing/ViewController.php:32
 * @route /21232f297a57a5a743894a0e4a801fc3{any}
 */
ViewController.head = (args: { any: string | number } | [any: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: ViewController.url(args, options),
    method: 'head',
})

export default ViewController