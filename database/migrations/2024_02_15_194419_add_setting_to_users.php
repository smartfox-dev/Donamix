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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('is_kick')->default(0);
            $table->integer('is_mute')->default(0);
            $table->integer('kick_mem')->default(0);
            $table->integer('mute_mem')->default(0);
            $table->integer('is_live')->default(0);
            $table->integer('is_away')->default(0);
            $table->integer('is_logout')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
