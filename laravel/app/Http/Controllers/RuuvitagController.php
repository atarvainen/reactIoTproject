<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Ruuvitag;
use DB;
 
class RuuvitagController extends Controller
{
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
 
    public function update(Request $request, Ruuvitag $tag)
    {
        $tag->update($request->all());
 
        return response()->json($tag, 200);
    }
 
    public function delete(Ruuvitag $tag)
    {
        $tag->delete();
 
        return response()->json(null, 204);
    }
    
    public function tagdata($tag)
    {
		try {
			$data = Ruuvitag::find($tag)->data;
			echo $data;
		} catch (\Exception $e){
			//echo 'Caught exception: ',  $e->getMessage(), "\n";
			//return response()->json(null, 204);
			return response()->json([
				'message' => 'Resource not found'
			], 404);
		}
        
    }
    
    public function tagtemp($tag)
    {
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->select('Temp', 'Time')->get();
        
        echo $data;
    }
    
    public function tagtempd($tag)
    {
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->select('Temp', 'Time')->get();
        
        echo $data;
    }
    
    public function tagtemph($tag, $day)
    {
        //SELECT [activity_dt], count(*) FROM table1 GROUP BY hour( activity_dt ) , day( activity_dt )
        
        $day = $day . '%';
        
        //select `Temp`, `CAST(Time` as `day)` from `Data`
        
        //select `Temp`, `CAST(Time` as `day)` from `Data`
        
        //select Temp, cast(Time as day) from `Data` 
        
        $taga = Ruuvitag::find($tag);
        
        //>whereDate('created_at', '2016-12-31')
        //select('Temp', CAST(Time AS day))
        //selectRaw('Temp, * CAST(Time AS day)')
        
        $data = $taga->data()->selectRaw('Temp, cast(Time as time) as Time')->where('Time', 'like', $day)->get();
        
        echo $data;
    }
    
    public function taghum($tag)
    {
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->select('Temp', 'Time')->get();
        
        echo $data;
    }
    
    public function taghumd($tag)
    {
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->select('Temp', 'Time')->get();
        
        echo $data;
    }
    
    public function taghumh($tag)
    {
        $taga = Ruuvitag::find($tag);
        
        $data = $taga->data()->select('Temp', 'Time')->get();
        
        echo $data;
    }
}