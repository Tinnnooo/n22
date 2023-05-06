<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
            "choice_type" => [
                "required",
                Rule::in(['short answer', 'paragraph', 'date', 'multiple choice', 'dropdown', 'checkboxes'])
            ],
            "choices" => "required_if:choice_type,multiple choice, dropdown, checkboxes",
            "is_required" => "boolean"
        ];
    }
}
