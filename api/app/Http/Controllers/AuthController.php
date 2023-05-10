<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\LoginResource;
use App\Http\Resources\UserResource;
use F9Web\ApiResponseHelpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    // use ApiResponseHelpers;

    public function login (LoginRequest $request) {

         // mengambil input data yang sudah tervalidasi
        $validator = $request->validated();

        // Jika data user (email atau password) salah.
        if (!Auth::attempt($validator)){
            return response()->json(["Email or password is incorrect"], 401);
        };

        // jika data user (email dan password) benar.
        $resource = LoginResource::make(Auth::user());
        return response()->json($resource);
    }

    public function logout (){

        // delete access token
        Auth::user()
        ->currentAccessToken()
        ->delete();

        return response()->json([
            "message" => "Logout success"
        ]);
    }
}
