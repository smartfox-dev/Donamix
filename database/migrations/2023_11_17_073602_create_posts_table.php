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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('user_id')->unsigned()->nullable();
            $table->text('description');
            $table->integer('views')->default(0);
            $table->integer('shares')->default(0);
            $table->integer('like')->default(0);
            $table->integer('heart')->default(0);
            $table->integer('laugh')->default(0);
            $table->integer('clap')->default(0);
            $table->tinyInteger('is_perspective')->nullable();
            $table->tinyInteger('is_edited')->nullable();
            $table->timestamps();


            $table->foreign('user_id')->references('id')
            ->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
