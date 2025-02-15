<?php

namespace App\Tables;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use JsonSerializable;
use Lacodix\LaravelModelFilter\Filters\Filter;

class Table implements JsonSerializable
{
    public array $columns = [];

    public ?array $filters = null;

    public array $actions = [];

    public array $records = [];

    public ?array $pagination = null;

    public bool $searchable = false;

    public bool $filterable = false;

    public mixed $model;

    public function __construct(LengthAwarePaginator|Collection $resource)
    {
        if ($resource instanceof LengthAwarePaginator) {
            $this->records = $resource->items();
            $this->pagination['per_page'] = $resource->perPage();
            $this->pagination['total'] = $resource->total();
            $this->pagination['page'] = $resource->currentPage();
        } else {
            $this->records = $resource->items();
        }

        $this->model = $resource->first();
    }

    public static function make(...$parameters): static
    {
        return new static(...$parameters);
    }

    public function searchable($searchable = true): static
    {
        $this->searchable = $searchable;

        return $this;
    }

    public function column($key, $title = null, $component = 'text'): static
    {
        $this->columns[$key] = ['accessor' => $key, 'title' => $title ?? $key, 'component' => 'columns.'.$component];

        return $this;
    }

    public function action($label, $url, $color = 'none', $method = 'get', $confirmation = null): static
    {
        if (! isset($this->columns['actions'])) {
            $this->columns['actions'] = ['accessor' => 'actions', 'title' => __('Actions'), 'component' => 'columns.actions'];
        }
        foreach ($this->records as $key => $record) {
            $this->actions[$key][] = [
                'label' => $label,
                'url' => $url($record),
                'color' => $color,
                'method' => $method,
                'confirmation' => $confirmation,
            ];
        }

        return $this;
    }

    public function editAction($url): static
    {
        $this->action(label: __('Edit'), url: $url, color: 'yellow');

        return $this;
    }

    public function deleteAction($url): static
    {
        $this->action(label: __('Delete'), url: $url, color: 'red', method: 'delete', confirmation: __('Are you sure you want to delete this record?'));

        return $this;
    }

    public function filterable($filterable = true): static
    {
        $this->filterable = $filterable;

        if ($filterable) {
            $this->filters = $this->model->filterInstances()
                ->map(fn (Filter $filter) => [
                    'attribute' => $filter->queryName(),
                    'title' => $filter->title(),
                    'component' => $filter->component(),
                    'options' => $filter->options(),
                ])->toArray();
        }

        return $this;
    }

    public function jsonSerialize(): array
    {
        return [
            'columns' => array_values($this->columns),
            'records' => collect($this->records)->map(fn ($record, $key) => $record->setAttribute('actions', $this->actions[$key])),
            'pagination' => $this->pagination,
            'filters' => $this->filters,
            'searchable' => $this->searchable,
            'filterable' => $this->filterable,
        ];
    }
}
