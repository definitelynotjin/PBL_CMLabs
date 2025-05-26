<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Ramsey\Uuid\Uuid;
use App\Models\Employee;
use App\Models\CheckClock;
use App\Models\Salary;
use App\Models\Letter;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Testing\Fluent\Concerns\Has;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false; // Disable timestamps

    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'phone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_admin' => 'boolean',
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

    public function employee()
    {
        return $this->hasOne(Employee::class, 'user_id');
    }

    public function checkClocks()
    {
        return $this->hasMany(CheckClock::class, 'user_id');
    }

    public function salaries()
    {
        return $this->hasMany(Salary::class, 'user_id');
    }

    public function letters()
    {
        return $this->hasMany(Letter::class, 'user_id');
    }
}
