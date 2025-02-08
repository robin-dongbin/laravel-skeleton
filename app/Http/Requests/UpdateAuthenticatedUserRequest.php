<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAuthenticatedUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nickname' => 'required',
        ];
    }
}
