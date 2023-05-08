<?php

namespace App\Http\Middleware;

use App\Models\Form;
use App\Models\Response as ModelsResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isTwiceResponse
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $form = Form::where('slug', $request->slug)->first();
        $response = ModelsResponse::where('user_id', $request->user()->id)->first();
        if ($form->limit_one_response && $response) {
            return response()->json([
                "message" => "You can not submit form twice"
            ], 422);
        }
        return $next($request);
    }
}
