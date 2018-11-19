<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Data;
 
class DataController extends Controller
{
    public function index()
    {
        return Data::all();
    }
 
    public function show(Data $data)
    {
        return $data;
    }
 //'Count', 'Temp', 'Humidity', 'Pressure', 'Acceleration-X', 'Acceleration-Y', 'Acceleration-Z', 'Power', 'Time', 'RuuviTagId',
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
 
    public function update(Request $request, Data $data)
    {
        $data->update($request->all());
 
        return response()->json($data, 200);
    }
 
    public function delete(Data $data)
    {
        $data->delete();
 
        return response()->json(null, 204);
    }
 
}