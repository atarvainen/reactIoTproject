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

//Estetty /api/-autentikointi GET-verbille. Haluttu kokeilla pakottaa POST, jotta selaimen default GET-lomake ei toimi ja pitää käyttää rest-rajapintaa 
Route::get('register', function () {
    return view('getdisabled');
});
Route::get('login', function () {
    return view('getdisabled');
});
Route::get('logout', function () {
    return view('getdisabled');
});

//POST-metodilla kläytettävät autentikointiresurssit. Sinänsä ei semanttisesti luontevaa autentikoida tilattomasti. Pientä turvallisuushyötyä tällä kuitenkin saavuttaa. Kun käyttäjä kirjautuu, niin edellinen tietokannassa oleva api_token ylikirjataan, joten kolmannet osapuolet eivät voi käyttää sitä enää. Samaten uloskirjautuminen nullaa api_token, joten ulkopuoliset eivät voi käyttää sitä.
Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@apilogin');
Route::post('logout', 'Auth\LoginController@apilogout');

//Products routes
//Kokeiltu tietokannan täyttämistä seeder:lla. Kokeiltu myös tätä kautta cors-konfigurointia.
/*
Route::get('products', array('middleware' => 'cors', 'uses' => 'ProductsController@index'));
Route::get('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@show'));
Route::post('products', array('middleware' => 'cors', 'uses' => 'ProductsController@store'));
Route::put('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@update'));
Route::delete('products/{product}', array('middleware' => 'cors', 'uses' => 'ProductsController@delete'));
*/

//Data routes
//Kaikkia resursseja ei ole mielekästä käyttää kaikille tietotyypeille. Esim. mittausdataa ei pitäisi manipuloida jälkikäteen... 
Route::get('data', 'DataController@index');
Route::get('data/{data}', 'DataController@show');
//Route::post('data', 'DataController@store');
//Route::put('data/{data}', 'DataController@update');
//Route::delete('data/{data}', 'DataController@delete');

//Ruuvitag routes
//Nämä tarvitsevat api_token autentikointiin (ohjaus tulee /config/auth-tiedosta)
//Seuraavalla kerralla voisi käyttää enemmän osoiteriviparametreja esim. ..?resolution=hourly&year=2017
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

