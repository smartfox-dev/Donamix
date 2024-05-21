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
        Schema::create('blogs', function (Blueprint $table) {

            $table->id();
            $table->unsignedBiginteger('category_id')->unsigned()->nullable();
            $table->unsignedBiginteger('user_id')->unsigned()->nullable();
            $table->string('banner')->nullable();
            $table->string('slug')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->integer('views')->nullable();
            $table->integer('shares')->nullable();
            $table->timestamps();

            $table->foreign('category_id')->references('id')
            ->on('blog_categories')->onDelete('cascade');

            $table->foreign('user_id')->references('id')
            ->on('users')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
