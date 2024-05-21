<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'firstName',
        'lastName',
        'birthday',
        'description',
        'country',
        'city',
        'status',
        'gender',
        'username',
        'avatar',
        'banner',
        'email',
        'password',
        'otp',
        'email_verified_at',
        'interests',
        'slug',
        'role',
        'credit',
        'is_blocked',
        'is_kick',
        'is_mute',
        'kick_mem',
        'mute_mem',
        'is_live',
        'is_away',
        'is_logout',
        'kick_room',
        'mute_room',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function experience()
    {
        return $this->hasOne(Experience::class, 'user_id');
    }

    public function education()
    {
        return $this->hasOne(Education::class, 'user_id');
    }

    public function post() {
        return $this->hasMany(Post::class, 'user_id');
    }
}
