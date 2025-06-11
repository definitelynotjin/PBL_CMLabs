<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;

class Authenticate extends Middleware
{
    /**
     * For Sanctum: always return 401 for unauthenticated access.
     */
    protected function redirectTo($request)
    {
        if ($request->expectsJson()) {
            throw new HttpResponseException(
                response()->json(['message' => 'Unauthenticated.'], 401)
            );
        }

        return null;
    }
}
