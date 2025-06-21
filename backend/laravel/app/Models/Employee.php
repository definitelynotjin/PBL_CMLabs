<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;


class Employee extends Model
{
    use HasFactory, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'user_id',
        'ck_settings_id',
        'first_name',
        'last_name',
        'gender',
        'address',
        'nik',
        'email',
        'phone',
        'position',
        'department',
        'birth_date',
        'join_date',
        'pendidikan_terakhir',
        'tempat_lahir',
        'employment_status',
        'grade',
        'status',
        'bank',
        'nomor_rekening',
        'atas_nama_rekening',
        'tipe_sp',
        'contract_type',
    ];


    protected $casts = [
        'gender' => 'string',
        'birth_date' => 'date',
        'join_date' => 'date',
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

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function checkClockSetting()
    {
        return $this->belongsTo(CheckClockSetting::class, 'ck_settings_id', 'id');
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
