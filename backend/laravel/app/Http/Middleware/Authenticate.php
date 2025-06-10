<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Override redirectTo so API calls do not redirect but return 401 Unauthorized.
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {

            return null;
        }
    }
}
