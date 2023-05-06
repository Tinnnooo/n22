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
    use ApiResponseHelpers;

    public function login (LoginRequest $request) : JsonResponse {
        $validator = $request->validated();

        if (!Auth::attempt($validator)){
            return $this->respondUnAuthenticated("Email or password is incorrect");
        };

        $user = Auth::user();

        $resource = LoginResource::make($user);

        return $this->respondWithSuccess($resource);
    }

    public function logout () : JsonResponse{
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return $this->respondWithSuccess(["message" => 'Logout success']);
    }
}
