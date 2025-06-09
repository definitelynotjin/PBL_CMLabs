<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\ResetPasswordNotification;
use App\Models\Employee;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;



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

    // Check if user can login with email
    public function hasEmail()
    {
        return !empty($this->email);
    }

    // Check if user can login with phone
    public function hasPhone()
    {
        return !empty($this->phone);
    }

    // Check if user is admin
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    // Check if user is employee
    public function isEmployee()
    {
        return $this->employee()->exists();
    }

    public function employee()
    {
        return $this->hasOne(Employee::class, 'user_id', 'id');
    }

    // Get display identifier (email or phone)
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
