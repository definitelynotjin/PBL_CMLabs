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
        'check_clock_type',        // '1' or '2'
        'check_clock_time',        // stored as string, e.g. "08:00:00"
        'latitude',
        'longitude',
        'supporting_document_path',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'check_clock_type' => 'string',  // enum as string is okay
        'check_clock_time' => 'string',  // time stored as string (HH:mm:ss)
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

    // Relationships

    // CheckClock belongs to User by user_id
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // CheckClock belongs to Employee by user_id
    public function employee()
    {
        // Note: This joins CheckClock.user_id = Employee.user_id
        return $this->belongsTo(Employee::class, 'user_id', 'user_id');
    }
}
