<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    'allowed_origins' => [
        // 'http://localhost:3000',                // local frontend dev
        // 'http://pblcmlabs.duckdns.org:3000',  // if your frontend runs on this port
        // 'http://pblcmlabs.duckdns.org:8000',  // backend URL (sometimes needed for API clients)
        // 'https://pblcmlabs.duckdns.org',       // frontend URL in production, if https
    ], // use your VM's IP here
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization', 'X-XSRF-TOKEN'],
    'exposed_headers' => ['Authorization'],
    'max_age' => 0,
    'supports_credentials' => true,
];
