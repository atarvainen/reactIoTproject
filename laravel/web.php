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

Route::get('/test/test', function () {
    return view('welcome');
});

Route::get('datatestaus', 'DataController@tag');

Route::get('tag', 'RuuvitagController@datas');

Route::get('testi', 'RuuvitagController@testi');

Route::get('tags', 'RuuvitagController@index');
Route::get('tags/{tag}', 'RuuvitagController@show');
Route::post('tagspost', 'RuuvitagController@store');
Route::put('tags/{tag}', 'RuuvitagController@update');
Route::delete('tags/{tag}', 'RuuvitagController@delete');
Route::get('tags/hannudelete/{id}' , 'RuuvitagController@deletetest'); //toimii

Route::get('hannudelete', 'RuuvitagController@hannuform');
Route::delete('hannudelete', 'RuuvitagController@hannudelete')->name('deletealias');
Route::delete('hannuajaxdelete', 'RuuvitagController@hannuajaxdelete');

Route::get('data', 'DataController@index');
Route::get('data/{data}', 'DataController@show');
Route::post('data', 'DataController@store');
Route::put('data/{data}', 'DataController@update');
Route::delete('data/{data}', 'DataController@delete');

Route::get('/sessiontest', function () {
    return view('posttest');
});

Route::get('/deleteFromFormTest', function () { //form with delete method
    return view('hannutest');
});

Route::post('/foo', function () {
        echo 1;
            return;
        });
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

