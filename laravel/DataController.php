<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Ruuvitag;
use App\Data;

class DataController extends Controller
{
	public function data()
    {
        $tags = Data::all();

        foreach ($tags as $tag) {
            echo $tag->Count;
        }
    }
    
    public function setHeader()
    {
        if(isset($_SERVER['HTTP_ORIGIN'])){
			if($_SERVER['HTTP_ORIGIN'] == "http://192.168.9.133") {
				header('Access-Control-Allow-Origin: http://192.168.9.133');
				header('Content-type: application/json');
			}
		}
    }

    public function testi()
    {
        $ruuvitag = DB::table('RuuviTag')->get();
		
		return json_encode($ruuvitag);
	}
    
    public function tag()
    {
        $tags = Data::find(1)->tag;
        echo $tags;
    }
    
    public function index()
    {
        //return Data::all();
        
        $hed = $this->setHeader();
        
        echo $hed;
    }

    public function show(Data $data)
    {
        return $data;
    }

    public function store(Request $request)
    {
        $data = Data::create($request->all());

        return response()->json($data, 201);
    }

    public function update(Request $request, Data $data)
    {
        $data->update($request->all());

        return response()->json($data, 200);
    }

    public function delete(Data $data)
    {
        $hed = $this->setHeader();
        
        echo $hed;
        
        //$data->delete();

        //return response()->json(null, 204);
    }
}
