<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Marketplace extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'price',
        'location',
        'category',
        'condition',
        'description',
        'is_sold'
    ];

    protected $appends = [
        'time_ago'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function medias()
    {
        return $this->morphMany(Media::class, 'mediable')->where('mediable_type', 'App\Models\Marketplace')->orderBy('created_at', 'desc');
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }
}
