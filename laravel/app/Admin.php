<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;


//funktio tarkastaa löytyykö admin tablesta käyttäjän id ja toteaa onko käyttäjällä admin oikeus
class Admin extends Model
{
    public static function admins($id){
        info($id);
        $admins = Admin::where('userid',$id)->get();
        $users = User::where('id',$id)->get();
        try
        {
            $Adminid = $admins->first()->userid;
            $Userid = $users->first()->id;
            //info($users->first()->id);
            if ($Adminid != null && $Adminid == $Userid)
            {
                info('True.');
                return true;
    
            }

        }
        catch (\Exception $e)
        {
            info('False.');
            return false;
        }
	}
}
