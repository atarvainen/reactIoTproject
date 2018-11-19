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

Route::get('/posttest', function () {
	return view('posttest');
});

Route::post('/foo', function () {
	return view('foo');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('profile', function() {
	return view('welcome');
})->middleware('auth');

Route::get('/testing', function () {
	return view('test');
});

