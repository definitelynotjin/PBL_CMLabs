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