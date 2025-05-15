<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class CheckClockSetting extends Model
{
    use HasFactory;

    protected $table = "check_clock_settings";
    protected $primaryKey = "id";
    public $incrementing = false;
    protected $keyType = "string";
    protected $fillable = ["id", "name", "type", "created_at", "updated_at", "deleted_at"];

    public function employees() { return $this->hasMany(Employee::class, "ck_settings_id"); }
    public function checkClockSettingTimes() { return $this->hasMany(CheckClockSettingTime::class, "ck_settings_id"); }
}