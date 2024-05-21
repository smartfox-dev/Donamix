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
        Schema::create('forums', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('user_id')->unsigned()->nullable();
            $table->unsignedBiginteger('category_id')->unsigned()->nullable();
            $table->text('description');
            $table->text('title');

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
        Schema::dropIfExists('forums');
    }
};
