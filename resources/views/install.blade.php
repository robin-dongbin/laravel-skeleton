<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
<main class="container mx-auto">
    <div class="h-screen mx-auto text-center">
        <div class="mt-20 flex flex-col gap-4 items-center justify-center">
            <h1 class="font-bold text-6xl">{{ config('app.name', 'Laravel') }}</h1>
            <p>{{ $message }}</p>
        </div>
    </div>
</main>
</body>
</html>
