<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		$this->call('MsimagesTableSeeder');
	}

}

class MsimagesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('msimages')->delete();
 
        DB::table('msimages')->insert([
          ['url' => './img/card01.png',
           'html_layout' => ''],
          ['url' => './img/card02.png',
           'html_layout' => ''],
          ['url' => './img/card03.png',
           'html_layout' => '']
        ]);
    }
 
}