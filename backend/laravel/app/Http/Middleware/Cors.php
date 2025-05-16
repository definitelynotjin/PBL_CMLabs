<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-TOKEN');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        if ($request->getMethod() === 'OPTIONS') {
            return response('', 200)->withHeaders([
                'Access-Control-Allow-Origin' => 'http://localhost:3000',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-CSRF-TOKEN',
                'Access-Control-Allow-Credentials' => 'true',
            ]);
        }

        return $response;
    }
}
