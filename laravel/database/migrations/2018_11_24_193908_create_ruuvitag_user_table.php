<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRuuvitagUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ruuvitags_users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('ruuvitagid');
			$table->unsignedInteger('userid');
			$table->timestamp('tagtouser')->nullable()->useCurrent();
			$table->timestamp('tagfromuser')->nullable();
			$table->timestamps();
			
			$table->foreign('ruuvitagid')->references('RuuviTagId')->on('RuuviTag');
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
        Schema::dropIfExists('ruuvitag_user');
    }
}
