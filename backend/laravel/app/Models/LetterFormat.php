<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class LetterFormat extends Model
{
    use HasFactory;

    protected $table = "letter_formats";
    protected $primaryKey = "id";
    public $incrementing = false;
    protected $keyType = "string";
    protected $fillable = ["id", "name", "content", "status", "created_at", "updated_at", "deleted_at"];

    public function letters() { return $this->hasMany(Letter::class, "letter_format_id"); }
}