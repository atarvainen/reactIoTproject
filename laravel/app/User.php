<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','api_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    //Model:sta ei saa ulos näitä tietoja
    protected $hidden = [
        'password', 'remember_token','api_token',
    ];
	
	//https://www.toptal.com/laravel/restful-laravel-api-tutorial
	//generoi api_token, tallentaa tietokantaan mallin avulla ja palauttaa generoidun avaimen
	public function generateToken()
    {
        $this->api_token = str_random(60);
        $this->save();

        return $this->api_token;
    }
	
	//Palauttaa mallien avulla kaikki käyttäjälle (id) osoitettujen Ruuvitagien tiedot.
	public function ruuvitags(){
		$ruuvitags_users = RuuvitagsUser::where('userid',$this->id)->get();
		return $ruuvitags_users;
	}

	
}
