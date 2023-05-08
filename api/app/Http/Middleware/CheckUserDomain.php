<?php

namespace App\Http\Middleware;

use App\Models\AllowedDomain;
use App\Models\Form;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $form = Form::where('slug', $request->slug)->first();
        $userDomain = substr(strrchr($request->user()->email, "@"), 1);
        $allowedDomain = $form->allowedDomains->pluck("domain")->toArray();
        if (!in_array($userDomain, $allowedDomain)) {
            return response()->json([
                "message" => "Forbidden access",
            ], 403);
        }
        return $next($request);
    }
}
