<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessageTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('messages', function(Blueprint $table)
        {
            $table->increments('message_id');
            $table->string('name',30);
            $table->text('message_body');
            $table->integer('msimage_id')->unsigned();
            $table->timestamps();

            $table->foreign('msimage_id')->references('msimage_id')->on('msimages');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
		Schema::dropIfExists('messages');
	}

}
