<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Storage;
class Media extends Model
{
    use HasFactory;

    protected $table = 'medias';

    protected $appends = [
        'time_ago'
    ];

    protected $fillable = [
        'user_id',
        'mediable_id',
        'mediable_type',
        'url'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function mediable()
    {
        return $this->morphTo();
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }

    // public function getUrlAttribute($value)
    // {
    //     if($value){
    //         return Url($value);
    //     }
    //     return "";
    // }
}
