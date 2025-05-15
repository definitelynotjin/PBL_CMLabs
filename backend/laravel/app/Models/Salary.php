<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Salary extends Model
{
    use HasFactory;

    protected $table = "salaries";
    protected $primaryKey = "id";
    public $incrementing = false;
    protected $keyType = "string";
    protected $fillable = ["id", "user_id", "type", "rate", "effective_date", "created_at", "updated_at", "deleted_at"];

    public function user() { return $this->belongsTo(User::class, "user_id"); }
}