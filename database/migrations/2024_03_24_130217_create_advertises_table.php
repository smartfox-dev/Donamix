<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('advertises', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('user_id')->unsigned()->nullable();
            $table->longText('urls')->nullable();
            $table->string('ads_type')->nullable();
            $table->string('conversation')->nullable();
            $table->string('site_url')->nullable();
            $table->string('button')->nullable();
            $table->string('description')->nullable();
            $table->string('country')->nullable();
            $table->integer('age_from')->nullable();
            $table->integer('age_to')->nullable();
            $table->string('gender')->nullable();
            $table->string('interest')->nullable();
            $table->string('work')->nullable();
            $table->integer('price')->nullable();
            $table->integer('expires')->nullable();
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
        Schema::dropIfExists('advertises');
    }
};
