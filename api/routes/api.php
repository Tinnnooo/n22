<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('/forms', [FormController::class, 'create']);
    Route::get('/forms', [FormController::class, 'get']);
    Route::get('/forms/{slug}', [FormController::class, 'getDetail']);
    Route::get('/forms/{slug}/questions', [QuestionController::class, 'add']);
    Route::delete('/forms/{slug}/questions/{id}', [QuestionController::class, 'remove']);
    Route::post('/forms/{slug}/responses', [ResponseController::class, 'submit']);
    Route::get('/forms/{slug}/responses', [ResponseController::class, 'get']);
});

Route::group(["prefix" => "v1/auth"], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});
