<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Ruuvitag;
use App\Data;

class RuuvitagController extends Controller
{
    public function testi()
    {
		if(isset($_SERVER['HTTP_ORIGIN'])){
			if($_SERVER['HTTP_ORIGIN'] == "http://192.168.9.133") {
				header('Access-Control-Allow-Origin: http://192.168.9.133');
				header('Content-type: application/json');
			}
		}
		
        $ruuvitag = DB::table('RuuviTag')->get();
		
		return json_encode($ruuvitag);
	}
    
    public function datas()
    {
        $data = Ruuvitag::find(257385652260480)->data;
        
        echo $data;
    }
    
    public function index()
    {
        return Ruuvitag::all();
    }

    public function show(Ruuvitag $tag)
    {
        return $tag;
    }

    public function store(Request $request)
    {
        $tag = Ruuvitag::create($request->all());

        return response()->json($tag, 201);
    }

    public function update(Request $request, Ruuvitag $tag)
    {
        $tag->update($request->all());

        return response()->json($tag, 200);
    }

    public function delete(Ruuvitag $tag)
    {
        if(isset($_SERVER['HTTP_ORIGIN'])){
			if($_SERVER['HTTP_ORIGIN'] == "http://192.168.9.133") {
				header('Access-Control-Allow-Origin: http://192.168.9.133');
				header('Content-type: application/json');
			}
		}
        echo "delete";
        //$tag->delete();

        //return response()->json(null, 204);
    }
	
	public function deletetest($tag)
    {
		$delete = Ruuvitag::find($tag);
		$delete->delete();
		echo "deleted" . $delete;
    }
	
	public function hannuform()
	{
		return view('hannudelete');
	}
	
	public function hannudelete($Request)
	{
		echo $Request.deleteid;
		echo "hannudelete";
	}
	
	public function hannuajaxdelete()
	{
		echo "delete";
	}
	
	
}