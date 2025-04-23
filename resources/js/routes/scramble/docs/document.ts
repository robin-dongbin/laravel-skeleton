import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see vendor/dedoc/scramble/src/ScrambleServiceProvider.php:255
 * @route /docs/api.json
 */
export const document = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: document.url(options),
    method: 'get',
})

document.definition = {
    methods: ['get','head'],
    url: '\/docs\/api.json',
}

/**
 * @see vendor/dedoc/scramble/src/ScrambleServiceProvider.php:255
 * @route /docs/api.json
 */
document.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return document.definition.url + queryParams(options)
}

/**
 * @see vendor/dedoc/scramble/src/ScrambleServiceProvider.php:255
 * @route /docs/api.json
 */
document.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: document.url(options),
    method: 'get',
})

/**
 * @see vendor/dedoc/scramble/src/ScrambleServiceProvider.php:255
 * @route /docs/api.json
 */
document.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: document.url(options),
    method: 'head',
})

export default document