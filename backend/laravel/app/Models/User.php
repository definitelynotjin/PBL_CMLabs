<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "users";
    protected $primaryKey = "id";
    public $incrementing = false;
    protected $keyType = "string";

    protected $fillable = ["id", "name", "email", "password", "is_admin"];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        "is_admin" => "boolean",
    ];

    public function employees()
    {
        return $this->hasMany(Employee::class, "user_id");
    }

    public function letters()
    {
        return $this->hasMany(Letter::class, "user_id");
    }

    public function salaries()
    {
        return $this->hasMany(Salary::class, "user_id");
    }

    public function checkClocks()
    {
        return $this->hasMany(CheckClock::class, "user_id");
    }
}
