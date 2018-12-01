<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/users', 'UserController@list_all');
Route::get('/delete/{id}', 'UserController@delete');
Route::get('/edit/{id}', 'UserController@edit');
Route::post('save', 'UserController@save');
/*Route::group(['middleware' => ['auth', 'admin']], function() {
    // your routes
    Route::get('login', 'Auth\LoginController@login');
    Route::get('harkat', 'HarkkaController@list_all');
});*/

