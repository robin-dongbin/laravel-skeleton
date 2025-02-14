<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Lacodix\LaravelModelFilter\Filters\Filter;

abstract class Controller
{
    public function limit(Request $request): int
    {
        return $request->integer('limit', min(15, 500));
    }

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
