<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\AbsenceRequestController;
use App\Http\Controllers\CheckClockController;
use App\Http\Controllers\CheckClockSettingController;
use App\Http\Controllers\CheckClockSettingTimeController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\UserController;

Route::post('/auth/google/callback', [GoogleAuthController::class, 'callback']);

// Auth - Public routes
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/auth/login-employee', [AuthController::class, 'loginEmployee']);

// Check if email exists
Route::get('/check-email', function (Request $request) {
    $email = $request->query('email');
    $exists = \App\Models\User::where('email', $email)->exists();
    return response()->json(['exists' => $exists]);
});


// Documents
Route::get('/employees/{userId}/documents', [DocumentController::class, 'index']);
Route::post('/documents', [DocumentController::class, 'store']);

// User info
Route::get('users/{id}', [UserController::class, 'show'])->middleware('auth:sanctum');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // User Info & Avatar
    Route::get('/me', fn(Request $request) => $request->user()->load('employee'));
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/user/avatar', [AuthController::class, 'uploadAvatar']);

    // Absence Requests
    Route::get('/absence-requests', [AbsenceRequestController::class, 'index']);
    Route::post('/absence-requests', [AbsenceRequestController::class, 'store']);
    Route::get('/absence-requests/{id}', [AbsenceRequestController::class, 'show']);
    Route::put('/absence-requests/{id}', [AbsenceRequestController::class, 'update']);
    Route::delete('/absence-requests/{id}', [AbsenceRequestController::class, 'destroy']);

    // Check Clock resources
    Route::apiResource('checkclocks', CheckClockController::class);
    Route::apiResource('checkclocksettings', CheckClockSettingController::class);
    Route::apiResource('checkclocksettingtimes', CheckClockSettingTimeController::class);

    // Employees CRUD
    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::post('/employees', [EmployeeController::class, 'store']);
    Route::get('/employees/{id}', [EmployeeController::class, 'show']);
    Route::put('/employees/{id}', [EmployeeController::class, 'update']);
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);

    // Upsert employee (create or update)
    Route::match(['POST', 'PUT'], '/employees/upsert/{id}', [EmployeeController::class, 'upsert']);
});
