<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Chat extends Model
{
    use HasFactory;

    protected $appends = [
        'time_ago'
    ];

    protected $fillable = [
        'user_id',
        'room_id',
        'member_id',
        'description',
        'audio',
        'is_error'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function member()
    {
        return $this->belongsTo(User::class, 'member_id');
    }

    public function medias()
    {
        return $this->morphMany(Media::class, 'mediable');
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }
}
