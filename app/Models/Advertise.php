<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Advertise extends Model
{
    use HasFactory;
    protected $appends = [
        'time_ago'
    ];

    protected $fillable = [
        'user_id',
        'ads_type',
        'urls',
        'site_url',
        'conversation',
        'button',
        'description',
        'country',
        'age_from',
        'age_to',
        'gender',
        'interest',
        'work',
        'price',
        'expires',
    ] ;
    
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }
}
