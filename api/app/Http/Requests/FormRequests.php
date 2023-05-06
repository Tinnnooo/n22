<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormRequests extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(){
        $this->merge([
            'creator_id' => $this->user()->id
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required",
            "slug" => "required|unique:forms|regex:/^([a-zA-Z])[a-zA-Z0-9.-]*$/",
            "allowed_domains" => "array",
            "description" => "nullable",
            "limit_one_response" => "boolean",
            "creator_id" => "exists:users,id"
        ];
    }
}
