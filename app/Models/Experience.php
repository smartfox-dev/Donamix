<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'position',
        'user_id',
        'from',
        'to',
        'is_present',
        'description',
        'city',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
