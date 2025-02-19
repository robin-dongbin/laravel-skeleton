<?php

namespace App\Console\Commands;

use App\Http\Controllers\Workerman\Controller;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Throwable;
use Workerman\Connection\TcpConnection;
use Workerman\Protocols\Http\Request;
use Workerman\Protocols\Http\Response;
use Workerman\Worker;

class Workerman extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'workerman {action} {--daemonize} {--port=8080} {--workers=1}';

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

        Worker::$logFile = storage_path('logs/workerman.log');

        $this->start('http://0.0.0.0:'.$this->option('port'), $this->option('workers'));

        Worker::runAll();
    }

    protected function start(string $socket, int $count): void
    {
        $worker = new Worker($socket);
        $worker->count = $count;

        $worker->onMessage = $this->onMessage(...);
    }

    public function onMessage(TcpConnection $connection, Request $request): null
    {
        try {
            if ($request->path() === '/favicon.ico' || ! Str::startsWith($request->path(), '/wk')) {
                return null;
            }

            app()->instance(Request::class, $request);

            $route = $this->route($request);
            $originalResponse = app()->call($route);

            $response = new Response;

            if ($originalResponse instanceof \Symfony\Component\HttpFoundation\Response) {
                $response->withHeaders($originalResponse->headers->all());
                $response->withStatus($originalResponse->getStatusCode());
                $response->withBody($originalResponse->getContent());
            }

            static::send($connection, $response, $request);
        } catch (Throwable $e) {
            static::send($connection, static::exceptionResponse($e), $request);
        }

        return null;
    }

    /**
     * @throws Exception
     */
    protected function route(Request $request): array
    {
        $path = Str::after($request->path(), '/wk/');

        return match ($path) {
            'index' => [new Controller, 'index'],
            default => throw new Exception('Route not found'),
        };
    }

    protected static function send(TcpConnection $connection, Response $response, Request $request): void
    {
        $keepAlive = $request->header('connection');
        if (($keepAlive === null && $request->protocolVersion() === '1.1')
            || $keepAlive === 'keep-alive' || $keepAlive === 'Keep-Alive'
            || ($response->getHeader('Transfer-Encoding') === 'chunked')
        ) {
            $connection->send($response);

            return;
        }
        $connection->close($response);
    }

    protected static function exceptionResponse(Throwable $e): Response
    {
        return new Response(500, [], config('app.debug') ? (string) $e : $e->getMessage());
    }
}
