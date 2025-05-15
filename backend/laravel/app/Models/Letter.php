<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Letter extends Model
{
    use HasFactory;

    protected $table = "letters";
    protected $primaryKey = "id";
    public $incrementing = false;
    protected $keyType = "string";
    protected $fillable = ["id", "letter_format_id", "user_id", "name", "created_at", "updated_at", "deleted_at"];

    public function letterFormat() { return $this->belongsTo(LetterFormat::class, "letter_format_id"); }
    public function user() { return $this->belongsTo(User::class, "user_id"); }
}