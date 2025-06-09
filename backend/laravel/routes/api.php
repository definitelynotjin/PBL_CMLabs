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



Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/auth/google/callback', [GoogleAuthController::class, 'callback']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->post('/user/avatar', [AuthController::class, 'uploadAvatar']);

Route::post('/auth/login-employee', [AuthController::class, 'loginEmployee']);

Route::get('/employees/candidates', [EmployeeController::class, 'candidates']);
Route::get('/employees', [EmployeeController::class, 'index']);
Route::post('/employees', [EmployeeController::class, 'store']);
Route::get('/employees/{employee}', [EmployeeController::class, 'show']);
Route::put('/employees/{employee}', [EmployeeController::class, 'update']);
Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/absence-requests', [AbsenceRequestController::class, 'index']);
    Route::post('/absence-requests', [AbsenceRequestController::class, 'store']);
    Route::get('/absence-requests/{id}', [AbsenceRequestController::class, 'show']);
    Route::put('/absence-requests/{id}', [AbsenceRequestController::class, 'update']);
    Route::delete('/absence-requests/{id}', [AbsenceRequestController::class, 'destroy']);
});

Route::apiResource('checkclocks', CheckClockController::class);
Route::apiResource('checkclocksettings', CheckClockSettingController::class);
Route::apiResource('checkclocksettingtimes', CheckClockSettingTimeController::class);


Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user()->load('employee');
});
