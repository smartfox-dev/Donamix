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
            $table->tinyInteger('is_enable_friend_request')->default(1);
            $table->tinyInteger('is_enable_private_message')->default(1);;
            $table->tinyInteger('is_enable_tagging')->default(1);;
            $table->tinyInteger('is_enable_private_profile')->default(1);;
            $table->tinyInteger('is_activate_account')->default(1);;
            $table->tinyInteger('is_remove_ads')->default(1);;
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
