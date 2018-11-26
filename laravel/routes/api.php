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

//Products routes

Route::get('products', array('middleware' => 'cors', 'uses' => 'ProductsController@index'));
 
Route::get('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@show'));
 
Route::post('products', array('middleware' => 'cors', 'uses' => 'ProductsController@store'));
 
Route::put('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@update'));
 
Route::delete('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@delete'));

//Data routes

Route::get('data', 'DataController@index');
 
Route::get('data/{data}', 'DataController@show');
 
Route::post('data', 'DataController@store');
 
Route::put('data/{data}', 'DataController@update');
 
Route::delete('data/{data}', 'DataController@delete');

//Ruuvitag routes
/*
hourly

tagtemp/tagi?day&showasHourly=true

daily
tagtemp/tagi&day
*/
Route::group(['middleware' => 'auth:api'], function() {
	Route::get('tags', 'RuuvitagController@index'); 
	Route::get('tags/{tag}', 'RuuvitagController@show');
	Route::get('tagdata/{tag}', 'RuuvitagController@tagdata');
	Route::get('tagtemp/{tag}', 'RuuvitagController@tagtemp');
	//Route::get('tagtempdaily/{tag}', 'RuuvitagController@tagtempd');
	Route::get('tagtemp/{tag}{day}', 'RuuvitagController@tagtemph');
	Route::get('taghum/{tag}', 'RuuvitagController@taghum');
	Route::get('taghum/{tag}/day/{day}', 'RuuvitagController@taghumd');
	//Route::get('taghumhourly/{day}', 'RuuvitagController@taghumh');
	Route::post('tags', 'RuuvitagController@store');
	Route::put('tags/{tag}', 'RuuvitagController@update');
	Route::delete('tags/{tag}', 'RuuvitagController@delete');
});

