<?php

declare(strict_types=1);

use App\Models\User;

test('create authenticated log', function () {
    $user = User::factory()->create();
    $action = app(App\Actions\CreateAuthenticationLogAction::class);

    $ip = fake()->ipv4();
    $ua = fake()->userAgent();
    $action->handle($user, ['ip_address' => $ip, 'user_agent' => $ua, 'successful' => true]);

    $this->assertDatabaseHas('authentication_logs', ['ip_address' => $ip, 'user_agent' => $ua, 'successful' => true]);

    expect($user->authentications()->count())->toBe(1);
});
