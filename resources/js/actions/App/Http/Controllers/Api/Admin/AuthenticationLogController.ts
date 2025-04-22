import { queryParams, type QueryParams } from './../../../../../../wayfinder'

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::index
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:22
 * @route /api/admin/authentication-logs
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
    url: '\/api\/admin\/authentication-logs',
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::index
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:22
 * @route /api/admin/authentication-logs
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::index
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:22
 * @route /api/admin/authentication-logs
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::index
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:22
 * @route /api/admin/authentication-logs
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::show
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:36
 * @route /api/admin/authentication-logs/{authentication_log}
 */
export const show = (args: { authentication_log: string | number } | [authentication_log: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '\/api\/admin\/authentication-logs\/{authentication_log}',
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::show
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:36
 * @route /api/admin/authentication-logs/{authentication_log}
 */
show.url = (args: { authentication_log: string | number } | [authentication_log: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { authentication_log: args }
    }

    if (Array.isArray(args)) {
        args = {
            authentication_log: args[0],
        }
    }

    const parsedArgs = {
        authentication_log: args.authentication_log,
    }

    return show.definition.url
            .replace('{authentication_log}', parsedArgs.authentication_log.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::show
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:36
 * @route /api/admin/authentication-logs/{authentication_log}
 */
show.get = (args: { authentication_log: string | number } | [authentication_log: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\Api\Admin\AuthenticationLogController::show
 * @see app/Http/Controllers/Api/Admin/AuthenticationLogController.php:36
 * @route /api/admin/authentication-logs/{authentication_log}
 */
show.head = (args: { authentication_log: string | number } | [authentication_log: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

const AuthenticationLogController = { index, show }

export default AuthenticationLogController