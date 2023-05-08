<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AccessForm;
use App\Http\Middleware\CheckUserDomain;
use App\Http\Middleware\isTwiceResponse;
use App\Models\Response;
use Illuminate\Http\Request;
use App\Http\Requests\ResponseRequest;
use App\Http\Resources\ResponseCollection;
use App\Http\Resources\ResponseDataCollection;
use App\Http\Resources\ResponseResource;
use App\Models\Answer;
use App\Models\Form;
use App\Models\Question;
use F9Web\ApiResponseHelpers;
use Illuminate\Http\JsonResponse;

class ResponseController extends Controller
{
    use ApiResponseHelpers;

    public function __construct()
    {
        $this->middleware(CheckUserDomain::class)->only('submit');
        $this->middleware(isTwiceResponse::class)->only('submit');

        $this->middleware(AccessForm::class)->only('get');
    }

    public function submit($slug, ResponseRequest $request): JsonResponse
    {
        $validator = $request->validated();

        $form = Form::where('slug', $slug)->first();

        $response = Response::create([
            'form_id' => $form->id,
            'user_id' => $request->user()->id,
            'date' => date('Y-m-d'),
        ]);

        foreach ($validator['answers'] as $answer) {
            $questionsId = $answer['question_id'];
            $question = Question::where(['id' => $questionsId, 'form_id' => $form->id])->get();

            if (!$question) {
                return $this->respondError("Invalid question ID: \"$questionsId\"");
            }

            $data = [
                'response_id' => $response->id,
                'question_id' => $questionsId,
                'value' => $answer['value'],
            ];

            Answer::create($data);
        }
        return $this->respondWithSuccess(['message' => 'Submit response success']);
    }

    public function get(Request $request): JsonResponse
    {
        $form = $request->get('form');
        $response = Response::where('form_id', $form->id)->get();

        return $this->respondWithSuccess([
            "message" => "Get responses success",
            "responses" => new ResponseCollection($response)
        ]);
    }
}
