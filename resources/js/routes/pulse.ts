import { queryParams, type QueryParams } from './../wayfinder'

/**
 * @see vendor/laravel/pulse/src/PulseServiceProvider.php:106
 * @route /pulse
 */
export const pulse = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: pulse.url(options),
    method: 'get',
})

pulse.definition = {
    methods: ['get','head'],
    url: '\/pulse',
}

/**
 * @see vendor/laravel/pulse/src/PulseServiceProvider.php:106
 * @route /pulse
 */
pulse.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return pulse.definition.url + queryParams(options)
}

/**
 * @see vendor/laravel/pulse/src/PulseServiceProvider.php:106
 * @route /pulse
 */
pulse.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: pulse.url(options),
    method: 'get',
})

/**
 * @see vendor/laravel/pulse/src/PulseServiceProvider.php:106
 * @route /pulse
 */
pulse.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: pulse.url(options),
    method: 'head',
})

export default pulse