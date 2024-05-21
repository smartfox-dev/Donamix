<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumsCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'title'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
}
