<?php

declare(strict_types=1);

test('create request log', function () {
    $action = app(App\Actions\CreateRequestLogAction::class);

    $request = request();
    $response = response()->json(['foo' => 'bar']);
    $action->handle($request, $response);

    $this->assertDatabaseCount('request_logs', 1);
});
