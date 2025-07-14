<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class AbsenceRequest extends Model
{
    use HasFactory, SoftDeletes;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'absence_requests';

    protected $fillable = [
        'id',
        'employee_id',
        'start_date',
        'end_date',
        'absence_type',
        'status',
        'reason',
        'file_path',
        'location_name',
        'address',
        'latitude',
        'longitude',
    ];

    protected $appends = ['file_url']; // << add this line

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function absenceRequests()
    {
        return $this->hasMany(AbsenceRequest::class, 'employee_id');
    }

    public function getFileUrlAttribute()
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }
}
