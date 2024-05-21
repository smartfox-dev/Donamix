<?php

namespace App\Classes\AgoraDynamicKey;

class Message
{
    public $salt;
    public $ts;
    public $privileges;
    public function __construct()
    {
        $this->salt = rand(0, 100000);

        $date = new \DateTime("now", new \DateTimeZone('UTC'));
        $this->ts = $date->getTimestamp() + 24 * 3600;

        $this->privileges = array();
    }
}
?>
