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

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

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
Route::get('/check_clock_settings/{id}/check_clock_setting_times', [CheckClockSettingController::class, 'getCheckClockSettingTimes']);
Route::get('/check_clock_settings/{id}/check_clocks', [CheckClockSettingController::class, 'getCheckClocks']);
Route::get('/employees/{id}/check_clocks', [EmployeeController::class, 'getCheckClocks']);
Route::get('/employees/{id}/salaries', [EmployeeController::class, 'getSalaries']);
Route::get('/employees/{id}/letters', [EmployeeController::class, 'getLetters']);
Route::get('/employees/{id}/check_clock_settings', [EmployeeController::class, 'getCheckClockSettings']);
Route::get('/employees/{id}/check_clock_setting_times', [EmployeeController::class, 'getCheckClockSettingTimes']);
Route::get('/employees/{id}/check_clock_setting_times/{setting_id}', [EmployeeController::class, 'getCheckClockSettingTime']);
Route::get('/employees/{id}/check_clock_setting_times/{setting_id}/check_clocks', [EmployeeController::class, 'getCheckClocksBySettingTime']);
