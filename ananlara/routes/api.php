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

//Products routes

Route::get('products', array('middleware' => 'cors', 'uses' => 'ProductsController@index'));
 
Route::get('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@show'));
 
Route::post('products', array('middleware' => 'cors', 'uses' => 'ProductsController@store'));
 
Route::put('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@update'));
 
Route::delete('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@delete'));

//Data routes

/*
Route::get('data', array('middleware' => 'cors', 'uses' => 'DataController@index'));
 
Route::get('data/{data}', array('middleware' => 'cors', 'uses' => 'DataController@show'));
 
Route::post('data', array('middleware' => 'cors', 'uses' => 'DataController@store'));
 
Route::put('data/{data}', array('middleware' => 'cors', 'uses' => 'DataController@update'));
 
Route::delete('data/{data}/', array('middleware' => 'cors', 'uses' => 'DataController@delete'));
*/

Route::get('data', 'DataController@index');
 
Route::get('data/{data}', 'DataController@show');
 
Route::post('data', 'DataController@store');
 
Route::put('data/{data}', 'DataController@update');
 
Route::delete('data/{data}', 'DataController@delete');

//Ruuvitag routes

Route::get('tags', 'RuuvitagController@index');
 
Route::get('tags/{tag}', 'RuuvitagController@show');
 
Route::post('tags', 'RuuvitagController@store');
 
Route::put('tags/{tag}', 'RuuvitagController@update');
 
Route::delete('tags/{tag}', 'RuuvitagController@delete');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
