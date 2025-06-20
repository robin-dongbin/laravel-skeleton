<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\Concerns\AsOption;
use App\Http\Controllers\Api\Controller;
use App\Http\Resources\EnumResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EnumController extends Controller
{
    public function __invoke(Request $request)
    {
        $enumPath = app_path('Enums');

        $data = collect(glob($enumPath.'/*.php'))->map(function ($file) {
            $enumNamespace = 'App\\Enums';
            $className = $enumNamespace.'\\'.Str::replaceLast('.php', '', basename($file));

            if (class_exists($className) && enum_exists($className)) {
                $enum = ['name' => Str::afterLast($className, '\\')];
                if (in_array(AsOption::class, class_uses_recursive($className))) {
                    $enum['options'] = $className::options();
                }

                return $enum;
            }

            return [];
        })
            ->filter(fn ($item) => array_key_exists('options', $item))
            ->values();

        return EnumResource::collection($data);
    }
}
