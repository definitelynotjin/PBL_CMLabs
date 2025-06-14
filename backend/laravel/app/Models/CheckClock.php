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
        'latitude',
        'longitude',
        'supporting_document_path',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'check_clock_type' => 'string', // 1: In, 2: Out
        'check_clock_time' => 'string',
        'latitude' => 'float',
        'longitude' => 'float',
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

    // Relationship: CheckClock belongs to an Employee
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'user_id', 'user_id');
    }
}
