<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateMsimageTableAddHtmlLayoutColumn extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// msimageテーブルにTwitterIDのカラムを追加する
		Schema::table('msimages', function($table)
		{
		    $table->text('html_layout')->agter('url');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('msimages', function($table)
		{
		    $table->dropColumn('html_layout');
		});
	}

}
