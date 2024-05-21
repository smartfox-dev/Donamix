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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('user_id')->unsigned()->nullable();
            $table->string('company_name')->nullable();
            $table->string('position')->nullable();
            $table->date('from')->nullable();
            $table->date('to')->nullable();
            $table->tinyInteger('is_present')->nullable();
            $table->string('city')->nullable();
            $table->string('description')->nullable();
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
        Schema::dropIfExists('experiences');
    }
};
