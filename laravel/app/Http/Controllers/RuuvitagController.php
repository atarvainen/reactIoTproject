<?php
 
namespace App\Http\Controllers;

use App\Ruuvitag; 
use DB;
use Illuminate\Http\Request;

class RuuvitagController extends Controller
{
	//Hakee kaikki Ruuvitag-sensorien tiedot mallin kautta tietokantataulusta
    public function index()
    {
        return Ruuvitag::all();
    }

	//Hakee tietyn Ruuvitag:n tiedot Ruuvitag:n MAC:n perusteella (muunnettu bigint tietokantaa  varten)
    public function show(Ruuvitag $tag)
    {
        return $tag;
    }
 
	//Validointia kokeiltu. Ei ole toteutettu admin-hallintapaneelia, missä tätä käytettäisi.
    public function store(Request $request)
    {
        /*
        $this->validate($request, [
        'RuuviTagId' => 'required|unique:tags|max:255',
        'User' => 'required',
    ]);
        $tag = Ruuvitag::create($request->all());
 
        return response()->json($tag, 201);
        */

        $tag = Ruuvitag::create($request->all());

        return response()->json($tag, 201);
    }
 
	//Ei ole toteutettu admin-hallintapaneelia. Tätä ei käytetä mihinkään tällä hetkellä
    public function update(Request $request, Ruuvitag $tag)
    {
        $tag->update($request->all());
 
        return response()->json($tag, 200);
    }
 
	//Ei ole toteutettu admin-hallintapaneelia. Tätä ei käytetä mihinkään tällä hetkellä
    public function delete(Ruuvitag $tag)
    {
        $tag->delete();
 
        return response()->json(null, 204);
    }
    
    //Ruuvitag::find löytää ruuvitagin mutta palauttaa aina vain ruuvitagid:2147483647, mutta oikean käyttäjänimen
	//Hakee kaiken tietyllä Ruuvitag:lla mitatun datan JSON-muodossa. Palauttaa JSON-muodossa 404-viestin jos Ruuvitag ei löydy
    public function tagdata($tag)
    {
		try {
			$data = Ruuvitag::find($tag)->data;
			echo $data;
		} catch (\Exception $e){
			return response()->json([
				'message' => 'Resource not found'
			], 404);
		}
        
    }
    
	//Hakee kaikki tietyllä Ruuvitag:lla mitatut lämpötilat ja mittausajat
    public function tagtemp($tag)
    {
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->select('Temp', 'Time')->get();
        
        echo $data;
    }
    
	//Hakee tietyn Ruuvitagin tiettynä päivänä mitatut lämpötilat.
    public function tagtempd($tag, $day)
    {
        $day = $day . '%';
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->selectRaw('Temp, cast(Time as time) as Time')->where('Time', 'like', $day)->get();
        echo $data;
    }
    
	//Hakee tietyn Ruuvitagin tiettynä päivänä tunnin välein mitatut lämpötilat.
	//Kommenteissa sql kyselyiden yrityksiä laravel querybuilderilla
    public function tagtemph($tag, $day)
    {   
        //käyttäjän antama päivämäärä muutetaan muotoon 2018-11-21% jotta aikaleima saadaan ohitettua
        $day = $day . '%';

        //select `Temp`, `CAST(Time` as `day)` from `Data`
        //select `Temp`, `CAST(Time` as `day)` from `Data`
        //select Temp, cast(Time as day) from `Data` 
        
        $taga = Ruuvitag::find($tag);
        
        //>whereDate('created_at', '2016-12-31')
        //select('Temp', CAST(Time AS day))
        //selectRaw('Temp, * CAST(Time AS day)')
        //SELECT DISTINCT Temp, EXTRACT(HOUR FROM Time) FROM Data WHERE Time like "2018-11-21%"
        
        $data = $taga->data()->selectRaw('DISTINCT Temp, EXTRACT(HOUR FROM Time) as Time')->where('Time', 'like', $day)->get();
        
        echo $data;
    }
    
    //Samat toiminnot kuin lämpötilan haulle, mutta nyt kosteudelle
    public function taghum($tag)
    {
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->select('Humidity', 'Time')->get();
        
        echo $data;
    }
    
    public function taghumd($tag, $day)
    {
        $day = $day . '%';
        
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->selectRaw('DISTINCT Humidity, EXTRACT(HOUR FROM Time) as Time')->where('Time', 'like', $day)->get();
        
        echo $data;
    }
    
    public function taghumh($tag)
    {
        $day = $day . '%';
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->selectRaw('Humidity, cast(Time as time) as Time')->where('Time', 'like', $day)->get();
        echo $data;
    }
}