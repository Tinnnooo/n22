<?php

namespace App\Http\Middleware;

use App\Models\Form;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AccessForm
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $form = Form::where('slug', $request->slug)->first();

        if(!$form){
            return abort(404, "Form not found");
        }

        if($form->creator_id !== $request->user()->id){
            return abort(403, "Forbidden access");
        }

        $request->attributes->add(["form" => $form]);
        return $next($request);
    }
}
