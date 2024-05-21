<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Friend extends Model
{
    use HasFactory;

    protected $fillable = [
        'from',
        'to',
        'status',
        'description',
    ];


}
