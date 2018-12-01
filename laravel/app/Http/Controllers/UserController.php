<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AdminTools;
use App\User;

class UserController extends Controller
{
    //Haetaan tietokannasta käyttäjät
    public function list_all()
    {
        $users = User::All();
        return view('users')->with('users', $users);
    }
    //editoidaan käyttäjän tietoja
    public function edit($id)
    {
        $users = User::All();
        return view('edit')->with('users', $users)->with('id', $id);
    }
    //poistetaan käyttäjä tietokannasta
    public function delete($id)
    {
        User::find($id)->delete();
        $users = User::All();
        return view('users')->with('users', $users);
    }
    // Tarkoituksena tallentaa käyttäjän muuttuneet tiedot tietokantaan, mutta Formin lähetys ei toimi...
    public function save(AdminTool $request)
    {
        info($request);
        User::find($id)->save();
        $users = User::All();
        return view('users')->with('users', $users);
    }
}
