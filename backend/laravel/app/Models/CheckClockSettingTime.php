<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;

class CheckClockSettingTime extends Model
{
    use HasFactory, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'ck_settings_id',
        'day',           // e.g. "Monday", "Tuesday", etc.
        'clock_in',      // time only
        'clock_out',
        'break_start',
        'break_end',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'clock_in' => 'string',
        'clock_out' => 'string',
        'break_start' => 'string',
        'break_end' => 'string',
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

    public function checkClockSetting()
    {
        return $this->belongsTo(CheckClockSetting::class, 'ck_settings_id');
    }
}
