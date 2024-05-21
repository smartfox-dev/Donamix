<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class VideoReaction extends Model
{
    use HasFactory;

    protected $appends = [
        'time_ago'
    ];

    protected $fillable = [
        'video_id',
        'user_id',
        'like',
        'heart',
        'clap',
        'laugh',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function video()
    {
        return $this->belongsTo(Post::class, 'video_id');
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }
}
