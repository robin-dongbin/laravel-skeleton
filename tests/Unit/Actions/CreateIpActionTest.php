<?php

declare(strict_types=1);

test('create ip', function () {
    $action = app(App\Actions\CreateIpAction::class);

    $ip = fake()->ipv4();
    $action->handle(['address' => $ip]);

    $this->assertDatabaseHas('ips', ['address' => $ip]);
});
