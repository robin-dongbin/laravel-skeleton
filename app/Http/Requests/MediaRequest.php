<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MediaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'file' => ['required', 'file'],
            'alt' => ['nullable', 'string'],
        ];
    }
}
