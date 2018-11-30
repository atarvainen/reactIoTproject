<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Data;
 
class DataController extends Controller
{
	//Hakee kaiken datan Data-mallin kautta Data-taulusta
    public function index()
    {
        return Data::all();
    }
 
	//Hakee tietyn tietueen id-numerolla (taulussa 'Count') Data-mallin kautta
    public function show(Data $data)
    {
        return $data;
    }
 
	//IoT-toteutus täyttää tietokantaa mittausten perusteella, joten tätä ei käytetä mihinkään tällä hetkellä
    public function store(Request $request)
    {
        $this->validate($request, [
        'Temp' => 'required',
        'Humidity' => 'required',
        'Pressure' => 'required',
        'Acceleration-X' => 'required',
        'Acceleration-Y' => 'required',
        'Acceleration-Z' => 'required',
        'Power' => 'required',
        'RuuviTagId' => 'required',
    ]);
        $data = Data::create($request->all());
 
        return response()->json($data, 201);
    }
 
	//Mittausdataa ei pitäisi muokata jälkikäteen, joten tätä ei käytetä mihinkään tällä hetkellä
    public function update(Request $request, Data $data)
    {
        $data->update($request->all());
 
        return response()->json($data, 200);
    }
 
	//Mittausdataa ei pitäisi poistaa, joten tätä ei käytetä mihinkään tällä hetkellä
    public function delete(Data $data)
    {
        $data->delete();
 
        return response()->json(null, 204);
    }
 
}