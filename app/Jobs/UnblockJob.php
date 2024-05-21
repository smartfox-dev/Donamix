<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Block;
use Auth;

class UnblockJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    protected $id;
    protected $room_id;
    protected $user_id;

    public function __construct($id, $room_id, $user_id)
    {
        $this->id = $id;
        $this->room_id = $room_id;
        $this->user_id = $user_id;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        // dd($this->id, $this->room_id, Auth::user()->id);
        Block::where('user_id', $this->user_id)->where('member_id', $this->id)->where('room_id', $this->room_id)->where('status', 'kick')->update(['status'=> 'unkick']);
    }
}
