<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AccessForm;
use App\Http\Middleware\RemoveForm;
use App\Http\Requests\QuestionRequest;
use App\Http\Resources\AddQuestionResource;
use App\Models\Question;
use F9Web\ApiResponseHelpers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    use ApiResponseHelpers;

    public function __construct(){
        $this->middleware(AccessForm::class)->only(['add', 'remove']);
        $this->middleware(RemoveForm::class)->only('remove');
    }

    public function add($slug, QuestionRequest $request) : JsonResponse {
        $validator = $request->validated();
        $form = $request->get("form");
        $choices = $validator['choices'];
        $validator['form_id'] = $form->id;
        $validator['choices'] = implode(', ', $choices);

        $data = Question::create($validator);

        return $this->respondWithSuccess(new AddQuestionResource($data));
    }

    public function remove($slug, $id, Request $request){
        $question = $request->get('question');

        $question->delete();

        return $this->respondWithSuccess(["message" => "Remove question success"]);
    }
}
