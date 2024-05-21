<?php

namespace App\Broadcasting;

use App\Models\User;

class PrivateChat
{
    /**
     * Create a new channel instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     */

    public function broadcastOn()
{
    return new PrivateChannel('private-chat.'.$this->receiverId);
}
}
