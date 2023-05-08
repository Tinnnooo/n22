<?php

namespace App\Http\Requests;

use App\Models\Question;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ResponseRequest extends FormRequest
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
            "answers" => "array|required|min:1",
            // "answers.*.question_id" => "exists:questions,id",
            // "answers.*.value" => function ($attribute, $value, $fail) {
            //     $index = Str::after($attribute, 'answers.');
            //     $index = Str::before($index, '.value');
            //     $questionId = $this->input("answers.{$index}.question_id");
            //     $question = Question::find($questionId);

            //     if ($question && $question->is_required && empty($value)) {
            //         $fail("The answers field is required.");
            //     }
            // },
        ];
    }
}
