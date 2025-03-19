<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthenticatedUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nickname' => ['required', 'string', 'max:255'],
        ];
    }
}
