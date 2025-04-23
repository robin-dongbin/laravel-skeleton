import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see vendor/dedoc/scramble/src/ScrambleServiceProvider.php:240
 * @route /docs/api
 */
export const ui = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ui.url(options),
    method: 'get',
})

ui.definition = {
    methods: ['get','head'],
    url: '\/docs\/api',
}

/**
 * @see vendor/dedoc/scramble/src/ScrambleServiceProvider.php:240
 * @route /docs/api
 */
ui.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return ui.definition.url + queryParams(options)
}

/**
 * @see vendor/dedoc/scramble/src/ScrambleServiceProvider.php:240
 * @route /docs/api
 */
ui.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: ui.url(options),
    method: 'get',
})

/**
 * @see vendor/dedoc/scramble/src/ScrambleServiceProvider.php:240
 * @route /docs/api
 */
ui.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: ui.url(options),
    method: 'head',
})

export default ui