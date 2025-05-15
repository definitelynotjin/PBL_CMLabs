<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class CheckClockSettingTime extends Model
{
    use HasFactory;

    protected $table = "check_clock_setting_times";
    protected $primaryKey = "id";
    public $incrementing = false;
    protected $keyType = "string";
    protected $fillable = ["id", "ck_settings_id", "day", "clock_in", "clock_out", "break_start", "break_end", "created_at", "updated_at", "deleted_at"];

    public function checkClockSetting() { return $this->belongsTo(CheckClockSetting::class, "ck_settings_id"); }
}