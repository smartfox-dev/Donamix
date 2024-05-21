<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Album extends Model
{
    use HasFactory;

    protected $appends = [
        'time_ago'
    ];

    protected $fillable = [
        'user_id',
        'description',
        'title',
    ];

    public function images()
    {
        return $this->morphMany(Media::class, 'mediable');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }
}
