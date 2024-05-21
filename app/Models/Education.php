<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Education extends Model
{
    protected $table = 'educations';

    use HasFactory;

    protected $fillable = [
        'uni_name',
        'user_id',
        'from',
        'to',
        'is_finished',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
