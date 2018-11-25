<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ruuvitag extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ruuvitag_user';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
    */
    protected $fillable = ['ruuvitagid', 'userid','tagtouser','tagfromuser'];
    
    // Relation.
    public function ruuvitag_user()
    {
        return $this->hasMany(Data::class, 'RuuviTagId');
    }
	
}