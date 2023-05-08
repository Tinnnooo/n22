<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Form;
use App\Models\Question;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RemoveForm
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $form = Form::where('slug', $request->slug)->first();

        // if(!$form){
        //     return abort(404, 'Form not found');
        // }

        $question = Question::where('form_id', $form->id)->where('id', $request->id)->first();

        if(!$question){
            return response()->json([
                "message" => "Question not found"
            ], 404);
        }

        // if($form->creator_id !== $request->user()->id){
        //     return abort(403, 'Forbidden access');
        // }

        $request->attributes->add(["question" => $question]);

        return $next($request);
    }
}
