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

    public function __construct(){
        $this->middleware(AccessForm::class)->only(['add', 'remove']);
        $this->middleware(RemoveForm::class)->only('remove');
    }

    public function add(QuestionRequest $request){
        $validator = $request->validated();
        $form = $request->get("form");
        $choices = $validator['choices'];
        $validator['form_id'] = $form->id;
        $validator['choices'] = implode(', ', $choices);

        $data = Question::create($validator);

        return response()->json(new AddQuestionResource($data));
    }

    public function remove(Request $request){
        $question = $request->get('question');
        $question->delete();
        return response()->json([
            "message" => "Remove question success"
        ], 200);
    }
}
