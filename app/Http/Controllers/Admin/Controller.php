<?php

namespace App\Http\Controllers\Admin;

use Lacodix\LaravelModelFilter\Filters\Filter;

abstract class Controller extends \App\Http\Controllers\Controller
{
    public function filters(string $modelName)
    {
        $model = new $modelName;

        return $model->filterInstances()
            ->map(fn (Filter $filter) => [
                'attribute' => $filter->queryName(),
                'title' => $filter->title(),
                'component' => $filter->component(),
                'options' => $filter->options(),
            ])->toArray();
    }
}
