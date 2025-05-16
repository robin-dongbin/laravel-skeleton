<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'max:255'],
            'nickname' => ['required', 'string', 'max:255'],
            'mobile' => ['required', 'string', 'max:20'],
            'role' => ['required', Rule::enum(UserRole::class)],
            'password' => ['required', Password::default()],
            'status' => ['required', Rule::enum(UserStatus::class)],
        ];
    }
}
