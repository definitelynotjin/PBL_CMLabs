<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class CheckClock extends Model
{
    use HasFactory;

    protected $table = "check_clocks";
    protected $primaryKey = "id";
    public $incrementing = false;
    protected $keyType = "string";
    protected $fillable = ["id", "user_id", "check_clock_type", "check_clock_time", "created_at", "updated_at", "deleted_at"];

    public function user() { return $this->belongsTo(User::class, "user_id"); }
}