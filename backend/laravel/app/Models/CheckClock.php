<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;



class CheckClock extends Model
{
    use HasFactory, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'check_clock_type',
        'check_clock_time',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'check_clock_type' => 'integer', // 1: In, 2: Out
        'check_clock_time' => 'string',
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

    // Relationship: CheckClock belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
