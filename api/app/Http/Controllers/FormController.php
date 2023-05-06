<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use App\Models\AllowedDomain;
use F9Web\ApiResponseHelpers;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\FormRequests;
use App\Http\Resources\DetailFormResource;
use App\Http\Resources\FormResource;
use App\Http\Resources\FormCollection;


class FormController extends Controller
{
    use ApiResponseHelpers;

    public function create(FormRequests $request) : JsonResponse {
        $validator = $request->validated();
        $form = Form::create($validator);

        foreach($validator['allowed_domains'] as $domain){
            AllowedDomain::create([
                "form_id" => $form->id,
                'domain' => $domain
            ]);
        }

        $response = FormResource::make($form);

        return $this->respondWithSuccess(["message" => "Create form success", "form" => $response]);
    }

    public function get() : JsonResponse {
        $user = auth()->user();

        $data = Form::where('creator_id', $user->id)->get();

        return $this->respondWithSuccess(new FormCollection($data));
    }

    public function getDetail($slug) : JsonResponse {
        $user = auth()->user();
        $form = Form::where('slug', $slug)->first();
        if(!$form){
            return abort(404, 'Form not found');
        }

        $userDomain = substr(strrchr($user->email, "@"), 1);
        $allowedDomain = AllowedDomain::where('form_id', $form->id)->pluck("domain")->toArray();
        if(!in_array($userDomain, $allowedDomain)){
            return abort(403, "Forbidden access");
        }

        return $this->respondWithSuccess(new DetailFormResource($form));
    }
}
