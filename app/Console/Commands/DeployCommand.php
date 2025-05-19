<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Process;
use Throwable;

class DeployCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '部署应用';

    /**
     * @throws Throwable
     */
    public function handle(): void
    {
        $this->info('开始部署');

        $this->executeCommands();
        $this->reloadPHP();
        $this->buildFrontEnd();

        $this->info('部署成功');
    }

    private function executeCommands(): void
    {
        $this->call('migrate', ['--force' => true]);
        $this->call('optimize');
        $this->call('horizon:terminate');
    }

    /**
     * @throws Throwable
     */
    private function reloadPHP(): void
    {
        if (Process::run('echo "" | sudo -S service php8.3-fpm reload')) {
            $this->info('PHP 已重启');
        } else {
            $this->fail('PHP 重启失败');
        }
    }

    /**
     * @throws Throwable
     */
    private function buildFrontEnd(): void
    {
        $result = Process::run("git diff --name-only HEAD~1 HEAD | grep -E '^(resources/|package\\.json$|pnpm-lock\\.yaml$)'");

        if ($result->successful() && trim($result->output()) !== '') {
            $this->info('前端文件或包管理文件有变更，执行构建...');
            $this->runInstall();
        } else {
            $this->info('前端文件和包管理文件无变更，跳过构建。');
        }
    }

    /**
     * @throws Throwable
     */
    private function runInstall(): void
    {
        $result = Process::timeout(5000)->run('pnpm install --frozen-lockfile --ignore-scripts');

        echo $result->output();

        if ($result->successful()) {
            $this->info('安装成功');
            $this->runBuild();
        } else {
            $this->fail('安装失败');
        }
    }

    /**
     * @throws Throwable
     */
    private function runBuild(): void
    {
        $result = Process::timeout(5000)->run('pnpm run build');

        echo $result->output();

        if ($result->successful()) {
            $this->info('构建成功');
        } else {
            $this->fail('构建失败');
        }
    }
}
