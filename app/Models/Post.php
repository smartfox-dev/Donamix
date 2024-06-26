<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Post extends Model
{
    use HasFactory;

    protected $appends = [
        'time_ago'
    ];

    protected $fillable = [
        'description',
        'video_link',
        'uuid',
        'user_id',
        'views',
        'shares',
        'like',
        'heart',
        'clap',
        'laugh',
        'is_perspective',
        'tags',
        'group_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function reaction()
    {
        return $this->hasOne(Reaction::class, 'post_id');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable')->orderBy('created_at', 'desc');
    }

    public function medias()
    {
        return $this->morphMany(Media::class, 'mediable')->where('mediable_type', 'App\Models\Post')->orderBy('created_at', 'desc');
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }
}
