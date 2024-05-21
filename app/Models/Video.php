<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Video extends Model
{
    use HasFactory;

    protected $appends = [
        'time_ago'
    ];

    protected $fillable = [
        'link',
        'uuid',
        'user_id',
        'views',
        'shares',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable')->where('commentable_type', 'App\Models\Video')->orderBy('created_at', 'desc');
    }
}
