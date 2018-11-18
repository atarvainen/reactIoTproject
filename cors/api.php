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
Route::get('products', array('middleware' => 'cors', 'uses' => 'ProductsController@index'));
 
Route::get('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@show'));
 
Route::post('products', array('middleware' => 'cors', 'uses' => 'ProductsController@store'));
 
Route::put('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@update'));
 
Route::delete('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@delete'));

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
