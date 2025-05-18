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
        'day',
        'clock_in',
        'clock_out',
        'break_start',
        'break_end',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'day' => 'date',
        'clock_in' => 'datetime',
        'clock_out' => 'datetime',
        'break_start' => 'datetime',
        'break_end' => 'datetime',
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

    // Relationship: CheckClockSettingTime belongs to a CheckClockSetting
    public function checkClockSetting()
    {
        return $this->belongsTo(CheckClockSetting::class, 'ck_settings_id');
    }
}
