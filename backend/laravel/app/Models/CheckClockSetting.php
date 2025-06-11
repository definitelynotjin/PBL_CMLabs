<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;

class CheckClockSetting extends Model
{
    use HasFactory, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'type',
        'latitude',
        'longitude',
        'radius',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'type' => 'integer', // 0: WFO, 1: WFA, 2: Hybrid
        'latitude' => 'float',
        'longitude' => 'float',
        'radius' => 'integer',
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

    // Relationship: CheckClockSetting has many Employees
    public function employees()
    {
        return $this->hasMany(Employee::class, 'ck_settings_id');
    }

    // Relationship: CheckClockSetting has many CheckClockSettingTimes
    public function times()
    {
        return $this->hasMany(CheckClockSettingTime::class, 'ck_settings_id');
    }
}
