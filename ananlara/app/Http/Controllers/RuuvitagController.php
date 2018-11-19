<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Ruuvitag;
 
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
 
}