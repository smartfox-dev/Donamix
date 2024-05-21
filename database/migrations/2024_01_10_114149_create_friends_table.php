<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('friends', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('from')->unsigned()->nullable();
            $table->unsignedBiginteger('to')->unsigned()->nullable();
            $table->tinyInteger('status');
            $table->timestamps();
            $table->foreign('from')->references('id')
            ->on('users')->onDelete('cascade');
            $table->foreign('to')->references('id')
            ->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friends');
    }
};
