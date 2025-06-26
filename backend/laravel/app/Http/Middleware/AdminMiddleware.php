<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Replace this with your actual admin check logic
        if (!$user || !$user->isAdmin()) {
            abort(403, 'Unauthorized - Admins only');
        }

        return $next($request);
    }
}
