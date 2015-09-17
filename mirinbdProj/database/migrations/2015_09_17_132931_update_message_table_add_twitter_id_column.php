<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateMessageTableAddTwitterIdColumn extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// messagesテーブルにTwitterIDのカラムを追加する
		Schema::table('messages', function($table)
		{
		    $table->string('twitter_id',30)->agter('name');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('messages', function($table)
		{
		    $table->dropColumn('twitter_id');
		});
	}

}
