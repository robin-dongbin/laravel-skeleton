<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'min:3',
                'max:20',
                Rule::notIn($this->illegalNames()),
                Rule::unique(User::class),
            ],
            'nickname' => [
                'required',
                'string',
                'min:2',
                'max:20',
                Rule::notIn($this->illegalNames()),
                Rule::unique(User::class),
            ],
            'password' => [
                'required',
                'min:4',
                'confirmed',
            ],
        ];
    }

    public function illegalNames(): array
    {
        return [];
    }
}
