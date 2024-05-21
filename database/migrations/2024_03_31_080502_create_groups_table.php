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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unsigned()->nullable();
            $table->longText('cover_photo')->nullable();
            $table->string('group_name')->nullable();
            $table->string('url')->nullable();
            $table->string('category')->nullable();
            $table->string('description')->nullable();
            $table->string('privacy')->nullable();
            $table->integer('member_count')->default(0);
            
            $table->integer('views')->default(0);
            $table->integer('shares')->default(0);
            $table->integer('like')->default(0);
            $table->integer('heart')->default(0);
            $table->integer('laugh')->default(0);
            $table->integer('clap')->default(0);

            $table->timestamp('deleted_at')->nullable();
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
        Schema::dropIfExists('groups');
    }
};
