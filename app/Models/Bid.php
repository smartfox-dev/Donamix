<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;

    protected $appends = [
      'time_ago'  
    ];

    protected $fillable = [
        'user_id',
        'job_id',
        'cv_letter',
        'cv_link',
        'deleted_at',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getTimeAgoAttribute(){
        return Carbon::parse($this->created_at)->diffForHumans();
    }
}
