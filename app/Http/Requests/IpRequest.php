<?php

namespace App\Http\Requests;

use App\Enums\IpStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IpRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'address' => ['required', 'string', 'ip'],
            'status' => ['required', Rule::enum(IpStatus::class)],
            'remark' => ['nullable', 'string'],
        ];
    }
}
