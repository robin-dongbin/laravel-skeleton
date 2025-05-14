<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>{{ config('app.name') }}</title>
    @viteReactRefresh
    @vite(['resources/js/apps/admin/main.tsx'])
</head>
<body>
<div id="root"></div>
</body>
</html>
