<?php

use Illuminate\Http\Request;
Use App\Article;

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


Route::group(['middleware' => 'auth:api'], function() {
    Route::get('articles', 'ArticleController@index');
    Route::get('articles/{article}', 'ArticleController@show');
    Route::post('articles', 'ArticleController@store');
    Route::put('articles/{article}', 'ArticleController@update');
    Route::delete('articles/{article}', 'ArticleController@delete');
});

/*
Route::get('articles', array('middleware' => 'cors', 'uses' => 'ArticleController@index'));
Route::get('articles/{article}', array('middleware' => 'cors', 'uses' => 'ArticleController@show'));
Route::post('articles', array('middleware' => 'cors', 'uses' => 'ArticleController@store'));
Route::put('articles/{article}', array('middleware' => 'cors', 'uses' => 'ArticleController@update'));
Route::delete('articles/{article}', array('middleware' => 'cors', 'uses' => 'ArticleController@delete'));
*/
Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
//Route::post('logout', 'Auth\LoginController@logout');

Route::get('logout', function() {
	return view('logout');
});

