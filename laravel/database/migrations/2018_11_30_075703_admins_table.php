<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

     //Admin tablen luonti tietokantaan
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->increments('id');
			$table->unsignedInteger('userid');
            $table->timestamps();
			$table->foreign('userid')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
