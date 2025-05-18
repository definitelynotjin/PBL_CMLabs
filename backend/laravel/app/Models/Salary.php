<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{
    use HasFactory, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'type',
        'rate',
        'efective_date',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'type' => 'integer', // 0: Hourly, 1: Monthly, 2: Contract
        'rate' => 'float',
        'efective_date' => 'date',
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

    // Relationship: Salary belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
