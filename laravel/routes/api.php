<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('register', function () {
    return view('getdisabled');
});
Route::get('login', function () {
    return view('getdisabled');
});
Route::get('logout', function () {
    return view('getdisabled');
});

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

//Data routes
Route::get('data', 'DataController@index');
Route::get('data/{data}', 'DataController@show');
Route::post('data', 'DataController@store');
Route::put('data/{data}', 'DataController@update');
Route::delete('data/{data}', 'DataController@delete');

//Tags routes
//Nämä tarvitsevat toimiakseen api_token -avaimen. Kaikki eivät välttämättä toimi.
Route::group(['middleware' => 'auth:api'], function() {
	Route::get('tags', 'RuuvitagController@index'); 
	Route::get('tags/{tag}', 'RuuvitagController@show');
	Route::get('tagdata/{tag}', 'RuuvitagController@tagdata');
	Route::get('tagtemp/{tag}', 'RuuvitagController@tagtemp');
	Route::get('tagtempd/{tag}/day/{day}', 'RuuvitagController@tagtempd');
	Route::get('tagtemp/{tag}/day/{day}', 'RuuvitagController@tagtemph');
	Route::get('taghum/{tag}', 'RuuvitagController@taghum');
	Route::get('taghumd/{tag}/day/{day}', 'RuuvitagController@taghumd');
	Route::get('taghum/{tag}/day/{day}', 'RuuvitagController@taghumh');
	Route::post('tags', 'RuuvitagController@store');
	Route::put('tags/{tag}', 'RuuvitagController@update');
	Route::delete('tags/{tag}', 'RuuvitagController@delete');
});

