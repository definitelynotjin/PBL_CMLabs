<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Employee extends Model
{
    use HasFactory;

    protected $table = "employees";
    protected $primaryKey = "id";
    public $incrementing = false;
    protected $keyType = "string";
    protected $fillable = ["id", "user_id", "ck_settings_id", "first_name", "last_name", "gender", "address"];

    public function user() { return $this->belongsTo(User::class, "user_id"); }
    public function checkClockSetting() { return $this->belongsTo(CheckClockSetting::class, "ck_settings_id"); }
}