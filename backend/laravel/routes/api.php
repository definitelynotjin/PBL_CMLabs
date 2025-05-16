<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\CheckClockSettingController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LetterFormatController;
use App\Http\Controllers\LetterController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\CheckClockSettingTimeController;
use App\Http\Controllers\CheckClockController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ResetPasswordController;



Route::middleware('auth:sanctum')->group(function () {
    Route::apiResources([
        'users' => UserController::class,
        'check_clock_settings' => CheckClockSettingController::class,
        'employees' => EmployeeController::class,
        'letter_formats' => LetterFormatController::class,
        'letters' => LetterController::class,
        'salaries' => SalaryController::class,
        'check_clock_setting_times' => CheckClockSettingTimeController::class,
        'check_clocks' => CheckClockController::class,
    ]);
});

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
