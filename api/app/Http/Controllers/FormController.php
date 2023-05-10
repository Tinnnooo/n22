<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CheckUserDomain;
use App\Http\Middleware\FormNotFound;
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

    public function create(FormRequests $request)
    {
        // validasi data dan buat data form baru
        $validator = $request->validated();
        $form = Form::create($validator);

        // buat data allowed domain

        $allowedDomain = [];
        foreach ($validator['allowed_domains'] as $domain) {
            $allowedDomain[] = new AllowedDomain([
                "domain" => $domain
            ]);
        }
        $form->allowedDomains()->saveMany($allowedDomain);

        return response()->json([
            "message" => "Create form success",
            "form" => FormResource::make($form)
        ], 200);
    }

    public function get()
    {
        $data = Form::where('creator_id', auth()->user()->id)->get();
        return response()->json(new FormCollection($data));
    }

    public function getDetail(Request $request)
    {
        $form = Form::where('slug', $request->slug)->first();

        return response()->json(new DetailFormResource($form));
    }

    public function __construct()
    {
        $this->middleware(FormNotFound::class)->only('getDetail');

        $this->middleware(CheckUserDomain::class)->only("getDetail");
    }
}
