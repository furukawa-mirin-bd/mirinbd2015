<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Models\Msimage;
use App\Models\Message;

use Illuminate\Http\Request;

class MessageController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		// 画像リストを取得
		$msImages = Msimage::all(['msimage_id','url']);
		return Response::json($msImages);
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function getImage()
	{
		// 画像を取得
		$msimage_id = Input::get('msimage_id');
		$image = Msimage::find($msimage_id);
		return Response::json($image);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

    /**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function postMessage()
	{
		$messageData = Input::All();

		$message = new Message;

		$message->name = $messageData["name"];
		$message->message_body = $messageData["message_body"];
		$message->msimage_id = $messageData["msimage_id"];

		$message->save();

		return Response("OK");
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
