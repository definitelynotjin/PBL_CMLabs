<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\ResetPasswordNotification;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'email',
        'phone',
        'password',
        'role',
        'employee_id',
        'is_active',
        'google_id',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'phone_verified_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function hasEmail()
    {
        return !empty($this->email);
    }

    public function hasPhone()
    {
        return !empty($this->phone);
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isEmployee()
    {
        return $this->employee()->exists();
    }

    public function checkClocks()
    {
        return $this->hasMany(CheckClock::class);
    }

    public function employee()
    {
        return $this->hasOne(Employee::class, 'user_id', 'id');
    }

    public function getDisplayIdentifierAttribute()
    {
        return $this->email ?: $this->phone ?: $this->employee_id;
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function getAvatarAttribute($value)
    {
        return $value ? asset('storage/' . $value) : asset('images/default-avatar.png');
    }
}
