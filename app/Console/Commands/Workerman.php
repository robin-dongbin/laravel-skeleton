<?php

namespace App\Console\Commands;

use App\Http\Controllers\Workerman\Controller;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Workerman\Connection\TcpConnection;
use Workerman\Protocols\Http\Request;
use Workerman\Worker;

class Workerman extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workerman {action} {--daemonize} {--port=8080}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start a Workerman server.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        global $argv;
        $argv[0] = 'workerman';
        $argv[1] = $this->argument('action');
        $argv[2] = $this->option('daemonize') ? '-d' : '';

        $this->start();
    }

    protected function start(): void
    {
        $worker = new Worker('http://0.0.0.0:'.$this->option('port'));

        $worker->onMessage = [$this, 'onMessage'];

        Worker::runAll();
    }

    public function onMessage(TcpConnection $connection, Request $request): void
    {
        if ($request->path() === '/favicon.ico' || ! Str::startsWith($request->path(), '/workerman')) {
            $connection->destroy();

            return;
        }
        $path = Str::after($request->path(), '/workerman/');

        app()->instance(Request::class, $request);

        $route = match ($path) {
            'hello/index' => [new Controller, 'index'],
            default => throw new \Exception('Route not found'),
        };
        $response = app()->call($route);

        $content = '';

        if ($response instanceof Response) {
            $content = $response->getContent();
        }

        $connection->send($content);
    }
}
