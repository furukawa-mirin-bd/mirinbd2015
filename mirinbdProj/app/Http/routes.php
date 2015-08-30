<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'IndexController@index');

// メッセージ投稿関連
Route::get('/message/images', 'MessageController@index');

Route::get('/message/image', 'MessageController@getImage');

Route::post('/message', 'MessageController@postMessage');