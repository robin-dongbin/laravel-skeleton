<?php

namespace App\Extensions;

use Dedoc\Scramble\Extensions\OperationExtension;
use Dedoc\Scramble\Support\Generator\Operation;
use Dedoc\Scramble\Support\RouteInfo;

class ScrambleExtension extends OperationExtension
{
    public function handle(Operation $operation, RouteInfo $routeInfo)
    {

//        ray($operation->path);
////        $routeInfo->methodType->setReturnType('asd');
//        ray($routeInfo->getMethodType());
    }
}
