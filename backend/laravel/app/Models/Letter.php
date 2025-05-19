<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;


class Letter extends Model
{
    use HasFactory, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id', 'letter_format_id', 'user_id', 'name', 'created_at', 'updated_at', 'deleted_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = Uuid::uuid4()->toString();
            }
        });
    }

    // Relationship: Letter belongs to a LetterFormat
    public function letterFormat()
    {
        return $this->belongsTo(LetterFormat::class, 'letter_format_id');
    }

    // Relationship: Letter belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
